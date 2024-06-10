import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loginForm!: FormGroup;
  isSubmitAttempt!: boolean;
  msgs!: Message[]
  constructor(private authService: AuthService, private router: Router) { }

  get usernameControl() {
    return this.loginForm.controls['username'];
  }

  get passwordControl() {
    return this.loginForm.controls['password'];
  }

  get usernameValidation() {
    if (this.usernameControl.errors && (this.usernameControl.touched || this.isSubmitAttempt)) {
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
  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.msgs = [];
  }

  onSubmit() {
    this.isSubmitAttempt = true;
    if (this.loginForm.valid) {
      const res = this.authService.login(this.loginForm.value);
      if (res) {
        this.router.navigate(['/']);
      } else {
        this.show();
      }
    } else {
      console.log('invalid user');
      
    }
  }

  show() {
    this.msgs = [
      { severity: 'error', summary: '', detail: 'Username or password invalid', life: 300 },
    ];
  }
}
