import {Page, NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';
import {UserData} from '../../providers/user-data';
import {AngularFire, FirebaseListObservable,FirebaseAuth,AuthProviders} from 'angularfire2';

@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;
  auth: FirebaseAuth;

  constructor(private nav: NavController, private userData: UserData, auth: FirebaseAuth) {
    this.auth = auth;
  }

  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      this.auth.login({provider: AuthProviders.Twitter});
      this.nav.push(TabsPage);
    }
  }

  onSignup() {
    this.nav.push(SignupPage);
  }
}
