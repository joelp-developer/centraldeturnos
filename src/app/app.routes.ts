import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';

export const routes: Routes = [
  {
    path: '',component: LoginComponent
  },
  {
    path: 'login',component:LoginComponent
  },
  {
    path: 'registro',component:RegistroComponent
  },
  {
    path:'forgot',component:ForgotpassComponent
  },
  {
    path: '**', redirectTo: 'login'
  }
];
