import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable }     from 'rxjs/Observable';
import {BarEntity} from '../entities/bar.entity';

@Injectable()
export class BarService {
    barList : Observable<Response>;
    
    private _dbName = "";
    private _dbUser = "";
    private _dbPassword = "";
    private barUrl = 'app/data/barData.json'; 
  constructor (private http: Http) {
  }
 
    getAllBars(){
      
        return this.http.get(this.barUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
    
    }
    
    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        let body = res.json();
        //console.log(body);
        return body;
    }
    
    private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
  
}