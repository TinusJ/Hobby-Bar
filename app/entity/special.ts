export class Special{
    
    private _specialId:number;
    private _specialName:string;
    private _specialDescription:string;
    private _specialPrice:number;
    private _specialStartTime:string;
    private _specialEndTime:string;
    private _specialDays:string[];
    
    constructor(){}
    
    public getSpecialId(){ return this._specialId; }
    public setSpecialId(id:number){ this._specialId = id;}
    
    public getSpecialName(){return this._specialName;}
    public setSpecialName(name:string){this._specialName = name;}
    
    public getSpecialDescription(){return this._specialDescription;}
    public  setSpecialDescrioption(desc:string){this._specialDescription = desc;}
    
    public getSpecialPrice(){ return this._specialPrice; }
    public setSpecialPrice(specialPrice:number){ this._specialPrice = specialPrice;}
    
    public getSpecialStartTime(){ return this._specialStartTime; }
    public setSpecialStartTime(startTime:string){ this._specialStartTime = startTime;}
    
    public getSpecialEndTime(){ return this._specialEndTime; }
    public setSpecialEndTime(endTime:string){ this._specialEndTime = endTime;}
    
    public getSpecialDays(){ return this._specialDays; }
    public setSpecialDays(days:string[]){ this._specialDays = days;}
    
}
