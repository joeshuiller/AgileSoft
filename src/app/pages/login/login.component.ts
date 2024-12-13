import { Component, OnDestroy, OnInit } from '@angular/core';
import { Menssage, RoutersLink } from '../../models/router';
import { AlertService } from '../../service/utility/alerts/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PagesStates } from '../../store/interface/pagesInterface';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as action from '../../store/actions';
import { LocalStoreService } from '../../service/utility/localstore/local-store.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  implements OnInit, OnDestroy {
  test: Date = new Date();
  public textAlert: any;
  public customerDetail: any = [];
  public toggleButton: any;
  public sidebarVisible: boolean;
  public form!: FormGroup;
  public userSubscription!: Subscription;
  constructor(
      private router: Router,
      public formBuilder: FormBuilder,
      private alert: AlertService,
      private localStore: LocalStoreService,
      private store: Store<PagesStates>) {
      this.sidebarVisible = false;
      this.textAlert = Menssage;
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  ngOnInit(): void {
    
    this.localStore.clear()
   this.initial();
   this.dataUsersSucess();
  }
  initial(){
    /* if (localStorage.getItem('token') !== null) {
      this.router.navigate([RoutersLink.home]);
    } */
    this.form = this.formBuilder.group({
      username: [Menssage.empty, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],
      password: [Menssage.empty, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
    });
  }
  dataUsersSucess(){
    this.userSubscription = this.store.select('auth')
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
           this.alertError(data.error.message);          
         }
         if (data.auth != null) {
             this.router.navigate([RoutersLink.content]);
         }
       })
   }
  onSubmit(item: any){
    if (this.valid(item)) {
        this.store.dispatch(action.loadingUsers({item}));
    }
  }
  valid(item: any): boolean{
    let valid = true
    if (item.email === Menssage.empty) {
      this.alertError(Menssage.email); 
      valid = false
    }
    if (item.password === Menssage.empty) {
      this.alertError(Menssage.password); 
      valid = false
    }
    return valid
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
}
