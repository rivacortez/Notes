import { Routes } from '@angular/router';
import {SignInComponent} from './iam/pages/sign-in/sign-in.component';
import {SignUpComponent} from './iam/pages/sign-up/sign-up.component';

export const routes: Routes = [
  { path: '', redirectTo: 'sign-up', pathMatch: 'full' },
  // IAM
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },

];
