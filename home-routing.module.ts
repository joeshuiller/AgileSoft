import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    children: [
      { path: 'content', loadChildren: () => import('./content/content.module').then(m => m.ContentModule) },
      { path: 'detailMovies', loadChildren: () => import('./detail-product/detail-product.module').then(m => m.DetailProductModule) },
    ] 
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
