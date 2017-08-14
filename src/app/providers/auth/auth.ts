import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { DebugProvider } from './../debug/debug';
import { LocalStorageService } from 'angular-2-local-storage';
import { DomInjectableService } from '../dom-injectable-service/dom-injectable-service';

interface AuthData {
    session?: { token: string, expires: Date },
    isAuthenticated?: boolean
}

@Injectable()
export class AuthService {
    authData: AuthData;
    
    constructor(
        private http: Http, 
        private debug: DebugProvider,
        private dom: DomInjectableService,
        public store: LocalStorageService
    ) {
        // Access local storage for existing user info
        this.authData = this.authData ? this.store.get("AuthData") : null;
        
        // Does session exist?
        if (!this.authData) {
            console.log("No session found.")
            
            // Create auth data if none found
            this.authData = {
                session: { token: null, expires: null },
                isAuthenticated: false,
            }
            // Store null auth data
            this.store.set("AuthData", this.authData);
        }

        this.dom.link('AuthService', this);
    }


    isAuthenticated() { return this.authData.isAuthenticated ? true : false; }

    beginSession(UserProvider) {
        let today = new Date();
        let sessionToken = !!UserProvider.parseUser ? UserProvider.parseUser.getSessionToken() : null;
        let expiryDate = !!UserProvider.parseUser ? 
            new Date( ( new Date() )
                .setFullYear( (today.getFullYear()), (today.getMonth() + 1), (today.getDate() + 30) ) 
            ) : null;


        this.authData = {
            session: { token: sessionToken, expires: expiryDate },
            isAuthenticated: UserProvider.parseUser.authenticated(),
        }
        
        this.store.set("AuthData", this.authData);
        return this.authData;

    }

    endSession() {
        this.authData = {
            session: { token: null, expires: null },
            isAuthenticated: false,
        }

        this.store.set("AuthData", this.authData);

        return this.authData;
    }


}