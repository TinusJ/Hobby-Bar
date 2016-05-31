import {Injectable} from '@angular/core';
import {Storage, LocalStorage, Events} from 'ionic-angular';
//import {Firebase} from './firebase'
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class UserData {
  _favorites = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  storage = new Storage(LocalStorage);
  af: AngularFire;
 // myFancyDb:any;
   items: FirebaseListObservable<any[]>;
  constructor(private events: Events, _af: AngularFire) {
    console.log('USER SERVICE CALLED');
    this.af = _af;
    //this.myFancyDb = new Firebase('https://bar-adviser.firebaseio.com');
     this.items = this.af.database.list('/specials');
    
    // console.log(this.items );
  }

  hasFavorite(sessionName) {
    return (this._favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName) {
    this._favorites.push(sessionName);
  }

  removeFavorite(sessionName) {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  }

  login(username) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:login');
   this.af.auth.login({ email: 'thinus@loyaltyplus.co.za', password: '@Tinus123' });
   
   console.log(this.af.auth.getAuth());
  }

  signup(username) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
    let firebaseCred = {
      'email':'thins@this.com',
      'password':'this'
    }
    // this.af.auth.login(firebaseCred)
    
  //  this.register()
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.events.publish('user:logout');
  }

  setUsername(username) {
    this.storage.set('username', username);
  }

  getUsername() {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }
  
  /*register(email:string,password:string){
         var self = this;
        this.myFancyDb.createUser({
                email: email,
                password: password
                }, function(error, userData) {
                if (error) {
                    switch (error.code) {
                    case "EMAIL_TAKEN":
                        console.log("The new user account cannot be created because the email is already in use.");
                        break;
                    case "INVALID_EMAIL":
                        console.log("The specified email is not a valid email.");
                        break;
                    default:
                        console.log("Error creating user:", error);
                    }
                } else {
                    console.log("Successfully created user account with uid:", userData.uid);
                    console.log(userData);
                  //  self.doLogin(email,password);
                }
                });
                
                
    }*/
}
