import {NavController, NavParams, Page} from 'ionic-angular';
import {SessionDetailPage} from '../session-detail/session-detail';
import {SocialSharing} from 'ionic-native';


@Page({
  templateUrl: 'build/pages/speaker-detail/speaker-detail.html'
})
export class SpeakerDetailPage {
  speaker: any;

  constructor(private nav: NavController, private navParams: NavParams) {
    this.speaker = this.navParams.data;
  }

  goToSessionDetail(session) {
    this.nav.push(SessionDetailPage, session);
  }
  
  
  shareViaTwitter(msg:string,image:string){
   // alert('Sharing Using Twitter');
   SocialSharing.shareViaTwitter(msg,"","");
  }
  
  shareViaFacebook(msg:string,image:string){
  //  alert('Sharing Using Facebook');
     SocialSharing.shareViaFacebook(msg,"","");
  }
  
  shareViaInstagram(msg:string,image:string){
   // alert('Sharing Using Instagram');
    SocialSharing.shareViaInstagram(msg, "");
  }
  
  shareViaWhatsapp(msg:string,image:string){
  //  alert('Sharing Using Whatsapp');
    SocialSharing.shareViaWhatsApp(msg, "", "");
  }
    
}
