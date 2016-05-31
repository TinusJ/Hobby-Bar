import {Page, NavParams} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/session-detail/session-detail.html'
})
export class SessionDetailPage {
  special: any;

  constructor(private navParams: NavParams) {
    this.special = navParams.data;
  }
}
