import { Routes } from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {RegisterPageComponent} from './components/register-page/register-page.component';
import {ChildDetailsComponent} from './components/child-details/child-details.component';
import {ChildRegisterComponent} from './components/child-register/child-register.component';

export const routes: Routes = [
  {path:"",component:HomePageComponent},
  {path:"login", component:LoginPageComponent},
  {path:"register", component:RegisterPageComponent},
  {path:"child/:id", component:ChildDetailsComponent},
  {path:"child-register", component:ChildRegisterComponent}
];
