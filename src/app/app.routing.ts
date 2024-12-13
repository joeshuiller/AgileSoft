import { Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

export const routes: Routes = [
    { 
        path: '', 
        loadChildren: () =>  import('./pages/login/login.module').then(m => m.LoginModule) 
    },
    { 
        path: 'home', 
        loadChildren: () =>  import('./pages/home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard]
    } 
];
