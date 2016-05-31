import {NavController, Page, ActionSheet} from 'ionic-angular';
import {ConferenceData} from '../../providers/conference-data';
import {SpeakerDetailPage} from '../speaker-detail/speaker-detail';
import {SessionDetailPage} from '../session-detail/session-detail';


@Page({
  templateUrl: 'build/pages/bars/bars.html'
})
export class BarsPage {
  actionSheet: ActionSheet;
  speakers = [];
  searcBars = [];
  queryTextBar:string;

  constructor(private nav: NavController, confData: ConferenceData) {
    confData.getSpeakers().then(speakers => {
      this.speakers = speakers;
      this.searcBars = speakers;
    });
  }

  goToSessionDetail(session) {
    this.nav.push(SessionDetailPage, session);
  }

  goToSpeakerDetail(speakerName: string) {
    this.nav.push(SpeakerDetailPage, speakerName);
  }

  goToSpeakerTwitter(speaker) {
    window.open(`https://twitter.com/${speaker.twitter}`);
  }

  openSpeakerShare(speaker) {
    let actionSheet = ActionSheet.create({
      title: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log('Copy link clicked on https://twitter.com/' + speaker.twitter);
            if (window['cordova'] && window['cordova'].plugins.clipboard) {
              window['cordova'].plugins.clipboard.copy('https://twitter.com/' + speaker.twitter);
            }
          }
        },
        {
          text: 'Share via ...',
          handler: () => {
            console.log('Share via clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    this.nav.present(actionSheet);
  }
  
  updateBarList(){
    //  alert(this.queryTextBar);
    let tmpSearch = [];
    if(this.queryTextBar != null && this.queryTextBar.length > 0 && this.queryTextBar != ''){
      console.log( this.searcBars);
       console.log( this.queryTextBar);
       for(let x =0;x < this.searcBars.length;x++){
          if(this.searcBars[x].name.toLowerCase().indexOf(this.queryTextBar.toLowerCase()) > 0){
            tmpSearch.push(this.searcBars[x]);
          }
       }
       
       this.searcBars = tmpSearch;
       
    }else{
      //Replace with original
      this.searcBars = this.speakers;
    }
    
    
  }
}
