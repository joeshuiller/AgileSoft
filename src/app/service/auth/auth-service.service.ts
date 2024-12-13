import { Injectable } from '@angular/core';
import { HttpsService } from '../https.service';
import { Router } from '@angular/router';
import { LocalStoreService } from '../utility/localstore/local-store.service';
import { AlertService } from '../utility/alerts/alert.service';
import { RoutersLink } from '../../models/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private registeresquest: HttpsService,
    private route: Router, 
    private localStore: LocalStoreService,
    private alert: AlertService
  ) { }
  
  login(inform:any){
    return  this.registeresquest.POST(RoutersLink.loginApi, inform)
  }

  popular(){
    return  this.registeresquest.GET(RoutersLink.popular)
  }

  refresh (inform:any){
    return  this.registeresquest.POST(RoutersLink.refresh, inform)
  }

  movies(){
    return  this.registeresquest.GET(RoutersLink.movies)
  }

  actors(id:number){
    let url = `${id}/actors`
    return  this.registeresquest.GET(RoutersLink.actors+url)
  }
}
