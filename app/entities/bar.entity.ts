export class BarEntity{
    
    private _barName:string;
    private _barDescription:string;
    private _barId:any;
    private _barLocation:string;
    private _openTime:string;
    private _closeTime:string;
  
  
    constructor(){
        
    }
    
    getBarName(){
         return this._barName;
    }
    getBarDescription(){
         return this._barDescription;
    }
    
     getBarId(){
         return this._barId;
    }
    
     getBarTime(){
         return this._openTime + '-'+this._closeTime;
    }
    
    getBarLocation(){
        return this._barLocation;
    }
    
    
}