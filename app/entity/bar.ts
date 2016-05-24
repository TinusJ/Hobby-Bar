import {Drink} from './drink';
import {Special} from './special';

export class Bar{
    
    private _barId:number;
    private _barName:string;
    private _barDescription:string;
    private _barLocation:string;
    private _barOpenTime:string;
    private _barCloseTime:string;
    private _barRating:number;
    private _barMenu:Drink[];
    private _barSpecials:Special[];
    
    constructor(){}
    
    public getBarId(){return this._barId;}
    public setBarId(id:number){this._barId =id;}
    
    public getBarName(){return this._barName;}
    public setBarName(name:string){this._barName = name;}
    
    public getBarDescription(){return this._barDescription;}
    public setBarDescription(descr:string){this._barDescription = descr;}
    
    public getBarLocation(){return this._barLocation;}
    public setBarLocation(location:string){this._barLocation =location};
    
    public getBarOpenTime(){return this._barOpenTime;}
    public setBarOpenTime(openTime:string){this._barOpenTime=openTime;}
    
    public getBarCloseTime(){return this._barCloseTime;}
    public setBarCloseTime(closeTime:string){this._barCloseTime=closeTime;}
    
    public getBarRating(){return this._barRating; }
    // Should I set rating Here?
    
    public getBarMenu(){return this._barMenu;}
    public setBarMenu(menu:Drink[]){this._barMenu = menu;}
    
    public addBarMenuItem(menuItem:Drink){
        this._barMenu.push(menuItem);
    }
    public removeBarMenuItem(menuItem:Drink){
       // this._barMenu.slice( this._barMenu.indexOf(menuItem),-1)
       //Removes
    }
    
    public getBarSpecials(){return this._barSpecials;}
    public setBarSpecials(specials:Special[]){this._barSpecials= specials;}
    
    public addBarSpecialtem(specialItem:Special){
        this._barSpecials.push(specialItem);
    }
    public removeBarSpecialItem(specialItem:Special){
       // this._barMenu.slice( this._barMenu.indexOf(menuItem),-1)
       //Removes
    }
    
}