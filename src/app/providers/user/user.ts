import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as Parse from 'parse';

import { DebugProvider } from './../debug/debug';
import { ParseService } from '../parse-service/parse-service';
import { AuthService } from './../auth/auth';
import { LocalStorageService } from 'angular-2-local-storage';
import { DomInjectableService } from '../dom-injectable-service/dom-injectable-service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


const TABLE_NAMES = {
	GAMES: 'GameObjects',
	PLAYERS: 'Players',
	HANDS: 'PlayerHands',
	SUBMISSIONS: 'Submissions',
	CARDS: 'CardList',
	USERS: 'Users'
}

@Injectable()
export class UserProvider {
	public id: string;
	public username: string;
	public firstname: string;
	public lastname: string;
	public email: string;
	private parseUser: any;
	private playerObject: any;


	
	constructor(
		private debug: DebugProvider,
		private auth: AuthService,
		public http: Http,
		public dom: DomInjectableService,
		public store: LocalStorageService,
		public parse: ParseService,
		public toastr: ToastsManager
	) {
		this.debug.log('Hello UserProvider Provider');
		this.dom.link('UserProvider', this);
		this.resetFromCache();
	}

	public login(username: string, password: string, success?: (res) => void, error?: (err) => void) {
		return new Promise((resolve: any, reject: any)=>{
			this.parse.logIn(username, password)
				.then(user=>{
					this.debug.log("Logged in user with responose", user);
					user.get('player').set('online', true);
					resolve( user.save().then(user=>{return this.populateUser(user); }) );
				})
				.catch( error => reject(error) );
		})
	}

	public logout() { 
		return new Promise((resolve, reject)=>{
			// // Get the player node before logging out
			let player = Parse.User.current().get('player');
			player.set('online', false);
			player.save().then(()=>{
				resolve( this.parse.logOut().then(()=>{ return this.resetUser(); }) );
			}).catch( error=> reject( error ) )
		})
	}

	public setKey(key: string, value: any) {
		// If the key isn't known, return this for chaining
		if (!this.hasOwnProperty(key)) return Promise.resolve(this);
		// Get Parse User and set the value
		this.parseUser = Parse.User.current() || function ParseCurrentUser() {};
		this.parseUser.set(key, value);
		
		// Get Player and save data
		let PlayerQuery = new Parse.Query(TABLE_NAMES.PLAYERS);
		let Player = Parse.Object.extend(TABLE_NAMES.PLAYERS);

		// Run query and change settings
		return PlayerQuery.get(this.id).then((player: any)=>{
			// If there is no player, create one
			if (!player) player = new Player();
			// Iterate over properties to set only if they are known
			['username', 'online', 'shames'].forEach(property=>{
				if (key === property) player.set(key, value);
			})
			// Save player, then user, then fetch updated
			return player.save().then(player=>{
				this.debug.log("Saved player. Now updating parse user", player);
				return this.parseUser.save().fetch().then((user)=>{
			        this.id = user.id;
			        // Set either new or old
			        this.id = player.id;
			        this.username = user.get('username');
			        this.firstname = user.get('firstname');
			        this.lastname = user.get('lastname');
			        this.email = user.get('email');
			        // Set the player object reference

			        // Return and resolve user
			        this.cacheUser();
			        return user;
				})
			})
		})

	}

	public create(user: {username: string, password: string, email: string}, cb: any) {
	    return this.parse.signup({username: user.username, password: user.password, email: user.email}, cb)
	      .then(results=>{
	        Parse.User.current().fetch()
	          .then((user)=>{
	            this.username = user.get('username');
	            this.firstname = user.get('firstname');
	            this.lastname = user.get('lastname');
	            this.email = user.get('email');
	            this.parseUser = user;
	            // Create a new player node
	            this.debug.log("Creating Player");
	            this.createPlayer(user).then(player=>{
		          	// Store the reference 
		          	this.debug.log("Setting player object", player);
		          	this.id = player.id;
		          	this.playerObject = player;
		          	user.set('player', player);
		          	user.save();
		          	return user;
		          });
	            // Return user for chaining
	            return user;
	          })
	      });
	  }

	public update(properties: any) {
		// Get Parse User and Player
		this.parseUser = Parse.User.current() || function ParseCurrentUser() {};
		let player = this.parseUser.get('player');

		// Iterate over keys and add them if they are valid
		Object.keys(properties).forEach(Key=>{
			this.debug.log("Checking for Key in both player and parseUser", Key, ["Value:", properties[ Key ], player.attributes[ Key ], this.parseUser.attributes[ Key ]])
			// Set the properties on both the user and player
			if (this.parseUser.attributes.hasOwnProperty( Key )) this.parseUser.set( Key, properties[ Key ]);
			if (player.attributes.hasOwnProperty( Key )) player.set( Key, properties[ Key ]);
		})

		return this.parseUser.save().then(user=>{
			this.debug.log("Saved user. Now updating parse user", user);
			return this.parseUser.save().fetch().then((user)=>{
		        this.id = user.get('player').id;
		        // Set either new or old
		        this.username = user.get('username');
		        this.firstname = user.get('firstname');
		        this.lastname = user.get('lastname');
		        this.email = user.get('email');
		        this.parseUser = user;

		        // Return and resolve user
		        this.cacheUser();
		        return user;
			})
		})

	}

	public createPlayer(user: any, callback?: any) {
	    let Player = Parse.Object.extend(TABLE_NAMES.PLAYERS);
	    let player = new Player();

	    player.set('username', user.get('username'))
	    player.set('userID', user.id)
	    player.set('online', true)
	    player.set('shames', 0)
	    // Return save as promise
	    this.debug.log("Creating Player", player);
	    return player.save();
  	}

  	public cacheUser() {
  		
  		this.store.set('User', {
			id: this.id,
			username: this.username,
			firstname: this.firstname,
			lastname: this.lastname,
			email: this.email,
			parseUser: this.parseUser
  		});

  		return this;
  	}

  	public populateUser(User: any) {
		let userID; let err;
		// Failsafe for determining the proper user id		
		try { userID = Parse.User.current().get('player').id || User.get('player').id; } 
		catch(e) { userID = User.id || "007"; err = e; }
		// Notify user of the id error
		finally { if(err) this.toastr.error(
			"Something went wrong while trying to determine your user id"
		)}
		
		this.id = userID;
		this.username = User.get('username') || null;
		this.firstname = User.get('firstname') || null;
		this.lastname = User.get('lastname') || null;
		this.email = User.get('email') || null;
		this.parseUser = Parse.User.current();
		// Store new properties properties
		this.cacheUser();
		// Auth the user
		this.auth.beginSession( this );
		// return user
		return User;
  	}

  	public resetUser() {
  		this.id = null;
		this.username = null;
		this.firstname = null;
		this.lastname = null;
		this.email = null;
		this.parseUser = null;
		// End auth session
		this.auth.endSession();
		
		// Store reset properties
		this.cacheUser();
  	}

  	public resetFromCache() {
  		// Check for logged in user and set credentials
    	if (Parse.User.current()) {
	      	return Parse.User.current().fetch()
	        	.then((user)=>{
	            	this.id = user.get('player').id;
	            	this.username = user.get('username');
	            	this.firstname = user.get('firstname');
					this.lastname = user.get('lastname');
					this.email = user.get('email');
					this.parseUser = user || Parse.User.current();
					// Auth User
					this.auth.beginSession( this );
					// Return user for chaining
					return user;
	          	})
	    }
	    else if (this.store.get('User')) {
	    	this.debug.log("Store has User", this.store.get('User'))
	    	// Get safe reference to attributes from cache
	    	let user: any = this.store.get('User');
	    	let attributes: any = user.attributes;
	    	if (!attributes) return Promise.resolve(true);
	    	
	    	// Set properties
	    	this.id = attributes.player.id;
        	this.username = attributes.username;
        	this.firstname = attributes.firstname;
			this.lastname = attributes.lastname;
			this.email = attributes.email;
			this.parseUser = user || Parse.User.current();
			// Auth User
			this.auth.beginSession( this );
			
			return Promise.resolve(true);
	    }
	    else return Promise.resolve("No User data Found!");
  	}



}
