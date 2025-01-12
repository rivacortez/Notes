import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  imports: [],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.css'
})
export class NotFoundPageComponent  {
  constructor(private router: Router) {}

  goToSignIn() {
    this.router.navigate(['/sign-in']);
  }
}
