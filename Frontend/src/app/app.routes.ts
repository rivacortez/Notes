import { Routes } from '@angular/router';
import {SignInComponent} from './iam/pages/sign-in/sign-in.component';
import {SignUpComponent} from './iam/pages/sign-up/sign-up.component';
import {NotesPageComponent} from './notes/pages/notes-page/notes-page.component';
import {AddNoteDialogComponent} from './notes/components/add-note-dialog/add-note-dialog.component';
import {AddCategoryDialogComponent} from './notes/components/add-category-dialog/add-category-dialog.component';
import {authenticationGuard} from './iam/services/authentication.guard';
import {NotFoundPageComponent} from './shared/public/pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'sign-up', pathMatch: 'full' },
  // IAM
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'notes-home', component: NotesPageComponent, canActivate: [authenticationGuard] },
  { path: '**', component: NotFoundPageComponent }
];
