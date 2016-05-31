import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {UserData} from './user-data';
//import * as Firebase from 'firebase/';
import {Observable} from 'rxjs/Observable'
import {AngularFire, FirebaseListObservable} from 'angularfire2';


@Injectable()
export class ConferenceData {
  data: any;
 // myFancyDb: any;
  af: AngularFire;
 // myFancyDb:any;
     specials= [];
   
  constructor(private http: Http, private user: UserData ,_af: AngularFire) {
     this.af = _af;
     // this.specials = this.af.database.list('/specials');
     // console.log( this.specials);
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('data/data.json').subscribe(res => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data = this.processData(res.json());
        resolve(this.data);
      });
    });
  }

  processData(data) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions

    data.tracks = [];

    // loop through each day in the schedule
    data.schedule.forEach(day => {
      // loop through each timeline group in the day
      day.groups.forEach(group => {
        // loop through each session in the timeline group
        group.sessions.forEach(session => {
          this.processSession(data, session);
        });
      });
    });

    return data;
  }

 
  
  processSession(data, session) {
    // loop through each speaker and load the speaker data
    // using the speaker name as the key
    session.speakers = [];
    if (session.speakerNames) {
      session.speakerNames.forEach(speakerName => {
        let speaker = data.speakers.find(s => s.name === speakerName);
        if (speaker) {
          session.speakers.push(speaker);
          speaker.sessions = speaker.sessions || [];
          speaker.sessions.push(session);
        }
      });
    }

    if (session.tracks) {
      session.tracks.forEach(track => {
        if (data.tracks.indexOf(track) < 0) {
          data.tracks.push(track);
        }
      });
    }
  }

  getTimeline(dayIndex, queryText , excludeTracks = [], segment = 'all') {
    /*return this.load().then(data => {
      let day = data.schedule[dayIndex];
      day.shownSessions = 0;

      queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
      let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

      day.groups.forEach(group => {
        group.hide = true;

        group.sessions.forEach(session => {
          // check if this session should show or not
          this.filterSession(session, queryWords, excludeTracks, segment);

          if (!session.hide) {
            // if this session is not hidden then this group should show
            group.hide = false;
            day.shownSessions++;
          }
        });

      });

      return day;
    });*/
    
    let sortedSpecials = [];
    let tmpSpecials = this.getFBSpecials();
    
    let matchesSegment = false;
 
    
    if(queryText === null || queryText.length < 1 || queryText === ''){
        for(let i = 0; i <  tmpSpecials.length ; i++){
           if (segment === 'favorites') {
                if (this.user.hasFavorite(tmpSpecials[i].specialName)) {
                  matchesSegment = true;
                }
              } else {
                matchesSegment = true;
              }
          
            if(matchesSegment)  {
              sortedSpecials.push(tmpSpecials[i]);
           }
      
        }
      return sortedSpecials;
    }
    
   // console.log(queryText);
    
    for(let i = 0; i <  tmpSpecials.length ; i++){
             if (segment === 'favorites') {
                if (this.user.hasFavorite(tmpSpecials[i].specialName)) {
                  matchesSegment = true;
                }
              } else {
                matchesSegment = true;
              }
        if(tmpSpecials[i].specialName.toLowerCase().indexOf(queryText.toLowerCase()) > -1){
           if(matchesSegment)  {
              sortedSpecials.push(tmpSpecials[i]);
           }
        }else{
          if(tmpSpecials[i].specialDescription.toLowerCase().indexOf(queryText.toLowerCase()) > -1){
             if(matchesSegment)  {
            sortedSpecials.push(tmpSpecials[i]);
           }
          }
        }
    }
    
    return sortedSpecials;
    
  }

  filterSession(session, queryWords, excludeTracks, segment) {

    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach(queryWord => {
        if (session.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    // if any of the sessions tracks are not in the
    // exclude tracks then this session passes the track test
    let matchesTracks = false;
    session.tracks.forEach(trackName => {
      if (excludeTracks.indexOf(trackName) === -1) {
        matchesTracks = true;
      }
    });

    // if the segement is 'favorites', but session is not a user favorite
    // then this session does not pass the segment test
    let matchesSegment = false;
    if (segment === 'favorites') {
      if (this.user.hasFavorite(session.name)) {
        matchesSegment = true;
      }
    } else {
      matchesSegment = true;
    }

    // all tests must be true if it should not be hidden
    session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
  }

  getSpeakers() {
    //this.bars = this.af.database.list('/bars');
    //console.log( this.specials);

    return this.load().then(data => {
      return data.speakers.sort((a, b) => {
        let aName = a.name.split(' ').pop();
        let bName = b.name.split(' ').pop();
        return aName.localeCompare(bName);
      });
    });
    
      
  }

  getTracks() {
    return this.load().then(data => {
      return data.tracks.sort();
    });
  }

  getMap() {
    return this.load().then(data => {
      return data.map;
    });
  }
  
  getFBSpecials(){
   if(  this.specials != null &&  this.specials.length > 0){
     return this.specials;
   }else{
     

    this.http.get('https://bar-adivser.firebaseio.com/bars.json')
            .map(res => res.json())
            .subscribe(data => {
             // Should Sort HERE !!!!!!!!!!!!
              for(let i =0;i < data.length;i++){
                console.log(data[i]);
                for(let j =0; j < data[i].barSpecials.length;j++){
                  console.log(data[i].barSpecials[j])
                  this.specials.push(data[i].barSpecials[j]);
                }
              }
            
            });
             return this.specials;
                }
  }

}



