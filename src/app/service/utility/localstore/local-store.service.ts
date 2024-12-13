import { Injectable } from '@angular/core';
import { RoutersLink } from '../../../models/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {

  public login: string = "token"
  public customerDetail: string = "customerDetail"
  constructor(
    private route: Router, 
  ) { }

  setSuccessLogin(item: any){
    console.log(item)
    localStorage.setItem(this.login,JSON.stringify(item))
  }

  getSuccessLogin():any{
    let dataUSers: string = `${localStorage.getItem(this.login)}`;
    return JSON.parse(dataUSers);
  }

  setItem( data: string, item: any){
    localStorage.setItem(data,JSON.stringify(item))
  }
  getItem(data: string):any{
    let dataUSers: string = `${localStorage.getItem(data)}`;
    return JSON.parse(dataUSers);
  }
  setItemSession(item: any, data: string){
    sessionStorage.setItem(data,JSON.stringify(item))
  }
  getItemSession(data: string):any{
    let dataUSers: string = `${sessionStorage.getItem(data)}`;
    return JSON.parse(dataUSers);
  }
  clear(){
    localStorage.clear();
  }
  removeEnd(data: string){
    localStorage.removeItem(data)
  }
  logout(){
    this.clear();
    this.route.navigate([RoutersLink.login]);
  } 
  numberDecimal = (number: any) => {
    const numberList = Number.parseFloat(number).toFixed(2)
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1,';
    return numberList.toString().replace(exp,rep);
  }
}
