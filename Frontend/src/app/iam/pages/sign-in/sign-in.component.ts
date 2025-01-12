import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthenticationService } from "../../services/authentication.service";
import { SignInRequest } from "../../model/sign-in.request";
import { Router, RouterLink } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit, AfterViewInit {
  signInForm!: FormGroup;
  submittedSignIn = false;

  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  @ViewChild('signUpBtn', { static: true }) signUpBtn!: ElementRef<HTMLButtonElement>;

  constructor(
    private builder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signInForm = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    if (this.signUpBtn) {
      this.signUpBtn.nativeElement.addEventListener("click", () => {
        this.router.navigate(['/sign-up']);
      });
    }
  }

  onSignUp(): void {
    this.router.navigate(['/sign-up']);
  }

  onSubmitSignIn(): void {
    if (this.signInForm.invalid) return;
    const { username, password } = this.signInForm.value;
    const signInRequest = new SignInRequest(username, password);
    this.authenticationService.signIn(signInRequest).subscribe({
      next: (response) => {
        this.submittedSignIn = true;
        localStorage.setItem('token', response.token);
      },
      error: (error) => {
        console.error('Error signing in', error);
      }
    });
  }
}
