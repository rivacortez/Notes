import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthenticationService } from "../../services/authentication.service";
import { SignUpRequest } from "../../model/sign-up.request";
import { NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,

    HttpClientModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit, AfterViewInit {
  signUpForm!: FormGroup;
  submittedSignUp = false;

  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  @ViewChild('signInBtn', { static: true }) signInBtn!: ElementRef<HTMLButtonElement>;

  constructor(
    private builder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.builder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngAfterViewInit(): void {
    if (this.signInBtn) {
      this.signInBtn.nativeElement.addEventListener("click", () => {
        this.router.navigate(['/sign-in']);
      });
    }
  }

  onSignIn(): void {
    this.container.nativeElement.classList.remove('sign-up-mode');
    this.router.navigate(['/sign-in']);
  }

  onSubmitSignUp(): void {
    if (this.signUpForm.invalid) return;
    const { username, password } = this.signUpForm.value;
    const signUpRequest = new SignUpRequest(username, password, 'ROLE_USER');
    this.authenticationService.signUp(signUpRequest).subscribe({
      next: (response) => {
        console.log('SignUpResponse:', response);
        this.router.navigate(['/sign-in']);
      },
      error: (error) => {
        console.error('Error signing up', error);
      }
    });
  }
}
