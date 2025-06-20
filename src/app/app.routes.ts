import { Routes } from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {RegisterPageComponent} from './components/register-page/register-page.component';
import {ChildDetailsComponent} from './components/child-details/child-details.component';
import {ChildRegisterComponent} from './components/child-register/child-register.component';
import {QuestionMissionPageComponent} from './components/question-mission-page/question-mission-page.component';
import {
  PhotoVerificationMissionPageComponent
} from './components/photo-verification-mission-page/photo-verification-mission-page.component';
import {ChildHomeComponent} from './components/child-home/child-home.component';
import {ChildPhotoMissionComponent} from './components/child-photo-mission/child-photo-mission.component';
import {ChildQuestionMissionComponent} from './components/child-question-mission/child-question-mission.component';
import {loginGuard} from './guards/login.guard';

export const routes: Routes = [
  {path:"",component:HomePageComponent,canActivate:[loginGuard]},
  {path:"login", component:LoginPageComponent},
  {path:"register", component:RegisterPageComponent},
  {path:"child/:id", component:ChildDetailsComponent,canActivate:[loginGuard]},
  {path:"child-register", component:ChildRegisterComponent,canActivate:[loginGuard]},
  {path:"questionmission/:id", component:QuestionMissionPageComponent,canActivate:[loginGuard]},
  {path:"photomission/:id", component:PhotoVerificationMissionPageComponent,canActivate:[loginGuard]},
  {path:"child-home", component:ChildHomeComponent},
  {path:"child/photomission/:id", component:ChildPhotoMissionComponent},
  {path:"child/questionmission/:id", component:ChildQuestionMissionComponent}
];
