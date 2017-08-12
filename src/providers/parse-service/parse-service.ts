import { Injectable } from '@angular/core';

import { DebugProvider } from './../debug/debug';
import { DomInjectableService } from '../dom-injectable-service/dom-injectable-service';

// Global Constants
var Parse: any = require('parse');

// Initialize Parse
Parse.initialize('3ouzEPg1EC1gDGCcyGniMtOhzLItxNZpFm58ZFjL', 'uVKdIy4d7bYWjdkSHK8YRwJWNMpiQX4la8uYmj2u');
Parse.serverURL = "https://bba.back4app.io/";


@Injectable()
export class ParseService {

  api: any = Parse;

  constructor(
    public debug: DebugProvider,
    public dom: DomInjectableService
  ) {
    // Respond to live query socket events
    Parse.LiveQuery.on('open', ()=>{
      let loggedIn = Parse.User.current() ? true : false;
      // this.debug.log("Opened Socket - Logged in: " + loggedIn);
    });

    Parse.LiveQuery.on('close', ()=>{
      let loggedIn = Parse.User.current() ? true : false;
      // this.debug.log("Opened Socket - Logged in: " + loggedIn);
    });

    Parse.LiveQuery.on('error', (error)=>{
      // this.debug.warn("Socket Experienced an Error", error);
    });

    this.dom.link('ParseService', this);

  }

  logIn(username: String, password: String, success?: (res) => void, error?: (err) => void) {
    return Parse.User.logIn(username, password)
      .then((res)=> { if (success) success(res); return res; })
      .catch((e)=> { if (error) error(e); return e; });
  }

  logOut() {
    if (Parse.User.current()) return Parse.User.logOut();
    else return new Promise((resolve, reject)=>{ resolve(true); })
  }

  logInFacebook(success: (user: Parse.User) => void, error: (user: Parse.User, error: any) => void) {

    Parse.FacebookUtils.logIn(null, {
      success: (user: Parse.User) => {
        // Call success funciton
        success(user);
      },
      error: (user: Parse.User, error: any) => {
        error(user, error);
      }
    });
  }

  signup(User: {username: string, password: string, email: string}, success: () => void) {
    let user = new Parse.User();
    user.set("username", User.username);
    user.set("password", User.password);
    user.set("email", User.email);

    this.debug.log("User to signup", User)

    return user.signUp().then(()=> {
      // Call success function
      user.fetch().then(()=>{success()})
    }, function(e) {
      this.debug.log("Signin failed through email");
    });
  }

  
  // Get all posts from the API
  test(success:(obj)=>string) {
    let Test = Parse.Object.extend("Test");
    let query = new Parse.Query(Test);
    query.find({
      success: function(obj) {
          success(obj);
      }
    });

    return "Parse Save Succeeded!";
  }



}
