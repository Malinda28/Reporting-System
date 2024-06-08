import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.controls['username']?.value
      const password = this.loginForm.controls['password']?.value;
      // Add your login logic here
      console.log('Username:', username);
      console.log('Password:', password);
      // You can implement authentication logic here
    } else {
      // Handle form validation errors
      console.log('Form is invalid');
    }

  }
}
