import {ViewChild} from '@angular/core';
import {IonicApp, Page, Modal, Alert, NavController, ItemSliding, List} from 'ionic-angular';
import {ConferenceData} from '../../providers/conference-data';
import {UserData} from '../../providers/user-data';
import {ScheduleFilterPage} from '../schedule-filter/schedule-filter';
import {SessionDetailPage} from '../session-detail/session-detail';
//import {AngularFire} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {Geolocation} from 'ionic-native';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Page({
  templateUrl: 'build/pages/specials/specials.html'
})
export class SpecialsPage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', {read: List}) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks = [];
  shownSessions = [];
  groups = [];
  specials  =[];
  lat:number;
  long:number;
  af: AngularFire;
  sizeSubject: Subject<any>;
  
  constructor(
    private app: IonicApp,
    private nav: NavController,
    private confData: ConferenceData,
    private user: UserData,
    _af: AngularFire
  ) {
    this.af = _af;
    //let bars =   _af.list('/bars/'); 
    //let bars:  FirebaseListObservable<any[]>;

    //this.getLocation();
  }

  onPageDidEnter() {
    this.app.setTitle('Specials');
  }

  ngAfterViewInit() {
    this.updateSchedule();
  }
  
  getLocation(){
    
   let geo_options = {
          enableHighAccuracy: true, 
          maximumAge        : 30000, 
          timeout           : 27000
        };

    Geolocation.getCurrentPosition(geo_options).then((resp) => {
          this.lat = resp.coords.latitude;
          this.long = resp.coords.longitude;
           console.log(resp);
         alert( this.lat+ " : "+this.long);
      });
      
     // google.maps.Circle

  }

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    this.scheduleList && this.scheduleList.closeSlidingItems();
    this.specials = this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment);
  }


  presentFilter() {
    let modal = Modal.create(ScheduleFilterPage, this.excludeTracks);
    this.nav.present(modal);

    modal.onDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    });

  }

  goToSessionDetail(special) {
    this.nav.push(SessionDetailPage, special);
  }

  addFavorite(slidingItem: ItemSliding, special) {

    if (this.user.hasFavorite(special.specialName)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite(slidingItem, special, 'Favorite already added');
    } else {
      // remember this session as a user favorite
      this.user.addFavorite(special.specialName);

      // create an alert instance
      let alert = Alert.create({
        title: 'Favorite Added',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });
      // now present the alert on top of all other content
      this.nav.present(alert);
    }

  }

  removeFavorite(slidingItem: ItemSliding, special, title) {
    let alert = Alert.create({
      title: title,
      message: 'Would you like to remove this special from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(special.specialName);
            this.updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    this.nav.present(alert);
  }
}
