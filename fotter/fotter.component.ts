import { Component } from '@angular/core';
import { LocalStoreService } from '../../../service/utility/localstore/local-store.service';
import { RoutersLink } from '../../../models/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fotter',
  templateUrl: './fotter.component.html',
  styleUrl: './fotter.component.scss'
})
export class FotterComponent {
  constructor(
    private router: Router,
    private localStore: LocalStoreService) {

  }
  logout(){
    this.localStore.clear();
    this.router.navigate([RoutersLink.login]);
  }
}
