import {Component} from '@angular/core';
import {BarService} from './services/bar.service';
import { HTTP_PROVIDERS } from '@angular/http';
import {BarEntity} from './entities/bar.entity';


@Component({
    selector: 'my-app',
    template: `<div>
                  <form name="searchForm">
                      <input [(ngModel)]="_search" placeholder="Search"/>
                      <button (click)="doSearch()"> Search </button>
                  </form>
              </div>
              
              <ul>
                    <li  *ngFor="let bar of bars">{{bar.BarName}}</li>
              </ul>
              
              
              `,
              providers:  [BarService,HTTP_PROVIDERS]
})

export class AppComponent {
    private _search:string;
    bars:BarEntity[];
     tmpBarList:BarEntity[] ; 
    errorMessage: string;
    
    constructor(private _barService:BarService){

    }
   
   doSearch(){
      
       if(this._search != null && this._search.length > 0){
            this._barService.getAllBars().subscribe(bars =>  this.getSearch(bars)  ,error => this.errorMessage = <any>error);
       }
   }
   
   getSearch(tmpBars:BarEntity[]){
       let list =BarEntity[];
       
       for(let i = 0 ; i < tmpBars.length;i++){
           var tmp =tmpBars[i];
           if (tmp.BarName.toLowerCase().indexOf(this._search.toLowerCase()) > -1) {
               //  console.log(tmp);
                 list.push(tmp);
           }
       }
       
         this.bars = list;
   }

}
