export class Drink{
    
    private _drinkId:number;
    private _drinkName:string;
    private _drinkDescription:string;
    private _drinkPrice:number;
   
    constructor(){}
    
    public getDrinkId(){ return this._drinkId;}
    public setDrinkId(id:number){this._drinkId=id;}
    
    public getDrinkName(){return this._drinkName;}
    public setDrinkName(name:string){this._drinkName=name;}
    
    public getDrinkDescription(){return this._drinkDescription;}
    public setDrinkDescription(descr:string){this._drinkDescription =descr;}
    
    public getDrinkPrice(){return this._drinkPrice;}
    public setDrinkPrice(price:number){this._drinkPrice = price;}
    
}