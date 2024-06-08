import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loginForm!: FormGroup;
  isSubmitAttempt!: boolean;

  constructor(private authService: AuthService, private router: Router){

  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.isSubmitAttempt = true;
    if (this.loginForm.valid) {
      const res = this.authService.login(this.loginForm.value);
      if (res) {
        this.router.navigate(['/']);
        
      }
    } else {
      // Handle form validation errors
    }
  }

  get usernameControl() {
    return this.loginForm.controls['username'];
  }

  get passwordControl() {
    return this.loginForm.controls['password'];
  }

  get usernameValidation() {
    if (this.usernameControl.errors && (this.usernameControl.touched || this.isSubmitAttempt)) {
      if (this.usernameControl.errors['email']) {
        return 'Please enter a valid email'
      }
      return 'Username is required';
    }
    return null;
  }

  get passwordValidation() {
    if (this.passwordControl.errors && (this.passwordControl.touched || this.isSubmitAttempt)) {
      return 'Password is required';
    }
    return null;
  }
}
