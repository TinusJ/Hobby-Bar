export declare class Firebase {    
    constructor(u:string);    
    set(s:string): any;
    set(a:any):any;
    once(s:string,a:any):any;
    child(s:string):any;
    on(s:string,a:any):any;
}