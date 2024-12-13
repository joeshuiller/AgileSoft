import { AfterViewInit, Component, ContentChild, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from '../../../service/utility/alerts/alert.service';
import { PagesStates } from '../../../store/interface/pagesInterface';
import { Store } from '@ngrx/store';
import { Menssage, RoutersLink } from '../../../models/router';
import * as action from '../../../store/actions';
import { LocalStoreService } from '../../../service/utility/localstore/local-store.service';
import { Populares } from '../../../store/interface/popularInterface';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent implements OnInit, OnDestroy, AfterViewInit{
  public userSubscription!: Subscription;
  public textAlert: any;
  public images: any[] = []
  public imagesUrl: string = ""
  public slider: any[] = []
  public sliderUrl: string = ""
  constructor(
      private router: Router,
      public formBuilder: FormBuilder,
      private alert: AlertService,
      private localStore: LocalStoreService,
      private store: Store<PagesStates>) {
      this.store.dispatch(action.loadingPopular());
      this.store.dispatch(action.loadingMovies());
      this.textAlert = this.localStore.getSuccessLogin();
  }
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this.dataPopularSucess()
    this.dataMoviesSucess();
    this.dataRefreshSucess();
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  dataPopularSucess(){
    this.userSubscription = this.store.select('popular')
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
          let reload =  this.localStore.getItem("reload")
          if (reload != "reload") {
            this.localStore.setItem("reload", "reload")
            window.location.reload()
          }
         }
       })
  }
  dataMoviesSucess(){
    this.userSubscription = this.store.select('movies')
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
          this.carouselPreprocessor(data.auth, 2)
         }
       })
  }
  processError(data: any) {
    switch (data.status) {
      case 401:
        if (this.textAlert.authorisation.refreshToken) {
          const item = {
            refresh_token:	this.textAlert.authorisation.refreshToken
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
  carouselPreprocessor(popular: Populares, id:number) {
    switch (id) {
      case 1:
          this.images = popular.data;
          this.imagesUrl = popular.imageBaseUrl
          console.log("result 1", popular)
        break;
      case 2:
        this.sliderUrl  = popular.imageBaseUrl
        this.slider = popular.data;
        console.log("result 2", popular)
        break;
    
      default:
        break;
    }
    
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
  
  detail(item: any){
    this.localStore.setItem(Menssage.detail, item)
    this.router.navigate([RoutersLink.detail]);
  }
}
