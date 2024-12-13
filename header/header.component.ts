import { Component } from '@angular/core';
import { LocalStoreService } from '../../../service/utility/localstore/local-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
  public textAlert: any;
  constructor(
    private localStore: LocalStoreService,
  ) {
    this.textAlert = this.localStore.getSuccessLogin();
    console.log(this.textAlert)
  }

}
