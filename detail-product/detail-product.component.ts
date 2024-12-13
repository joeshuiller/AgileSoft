import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from '../../../service/utility/alerts/alert.service';
import { LocalStoreService } from '../../../service/utility/localstore/local-store.service';
import { PagesStates } from '../../../store/interface/pagesInterface';
import { Menssage, RoutersLink } from '../../../models/router';
import * as action from '../../../store/actions';
import { Store } from '@ngrx/store';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Populares } from '../../../store/interface/popularInterface';
@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent implements OnInit, OnDestroy {
  public userSubscription!: Subscription;
  public textAlert: any;
  public users: any;
  public slider: any[] = []
  public sliderUrl: string = ""
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private alert: AlertService,
    private localStore: LocalStoreService,
    private store: Store<PagesStates>) {
    this.textAlert = this.localStore.getItem(Menssage.detail);
    console.log(this.textAlert)
    this.users = this.localStore.getSuccessLogin();
    this.store.dispatch(action.loadingActors({item: this.textAlert.id}));
    
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.dataRefreshSucess()
    this.dataActorsSucess()
  }
  dataActorsSucess(){
    this.userSubscription = this.store.select('actors')
       .subscribe((data: any) =>{
         console.log(data)
         switch (data.loading) {
           case true:
             this.loading();
             break;
           case false:
             this.stopLoading();
             break;
           default:
             break;
         }
         if (data.error != null) {
          this.processError(data.error)          
         }
         if (data.auth != null) {
            this.carouselPreprocessor(data.auth, 1)
         }
       })
  }
  dataRefreshSucess(){
    this.userSubscription = this.store.select('refresh')
       .subscribe((data: any) =>{
         switch (data.loading) {
           case true:
             this.loading();
             break;
           case false:
             this.stopLoading();
             break;
           default:
             break;
         }
         if (data.error != null) {
          this.processError(data.error)          
         }
         if (data.auth != null) {
          let reload =  this.localStore.getItem("reload")
          if (reload != "reload") {
            this.localStore.setItem("reload", "reload")
            window.location.reload()
          }
         }
       })
  }
  processError(data: any) {
    switch (data.status) {
      case 401:
        if (this.users.authorisation.refreshToken) {
          const item = {
            refresh_token:	this.users.authorisation.refreshToken
          }
          this.store.dispatch(action.loadingRefresh({item}));  
        } else {
          this.logout();
        }
        break;
      case 400:
          this.logout();
          break;
      default:
        this.alertError(data.message);
        break;
    }
  }
  carouselPreprocessor(popular: any, id:number) {
    this.sliderUrl  = popular.imageBaseUrl
    this.slider = popular.data;
  }
  loading(){
    this.alert.loading();
  }
  stopLoading(){
    this.alert.messagefin();
  }
  alertError(description: string){
    this.alert.error(Menssage.error, description);
  }
  logout(){
    this.localStore.clear();
    this.router.navigate([RoutersLink.login]);
  }
}
