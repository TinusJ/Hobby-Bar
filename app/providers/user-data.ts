import {Injectable} from '@angular/core';
import {Storage, LocalStorage, Events} from 'ionic-angular';
//import {Firebase} from './firebase'
import {AngularFire, FirebaseListObservable,AuthMethods,AuthProviders,firebaseAuthConfig} from 'angularfire2';
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
     //this.items = this.af.database.list('/specials');
    
    // console.log(this.items );
  }

  hasFavorite(specialName) {
    return (this._favorites.indexOf(specialName) > -1);
  }

  addFavorite(specialName) {
    this._favorites.push(specialName);
  }

  removeFavorite(specialName) {
    let index = this._favorites.indexOf(specialName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  }

  login(username) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:login');
    // Do LOGIN - FIREBASE
    this.af.auth.login();
  }


  signup(username,password) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
       // Do LOGIN - SIGNUP
       this.af.auth.createUser({"email":"thinus@loyaltyplus.co.zaa","password":"TinusTest"});
      
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
  

}
