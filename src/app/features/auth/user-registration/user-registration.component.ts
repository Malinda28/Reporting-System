import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { passwordMatchValidator, passwordStrengthValidator } from '../../../shared/validation.functions';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.scss'
})
export class UserRegistrationComponent {
  registrationForm!: FormGroup;
  isSubmitAttempt: boolean = false;

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, passwordStrengthValidator()]),
      confirmPassword: new FormControl('', [Validators.required])
    },{ validators: passwordMatchValidator });
  }

  onSubmit() {
    this.isSubmitAttempt = true;
    if (this.registrationForm.valid) {
      const res = this.authService.registerUser(this.registrationForm.value);
      if (res) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registered successfully!' });
        this.router.navigate(['auth/login']);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Oops', detail: 'Already in the system!' });
      }
    }
  }

  get usernameControl() {
    return this.registrationForm.controls['username'];
  }

  get name() {
    return this.registrationForm.controls['name'];
  }

  get passwordControl() {
    return this.registrationForm.controls['password'];
  }

  get confirmPasswordControl() {
    return this.registrationForm.controls['confirmPassword'];
  }

  get usernameValidation() {
    if (this.usernameControl?.errors && (this.usernameControl.touched || this.isSubmitAttempt)) {
      if (this.usernameControl?.errors['email']) {
        return 'Please enter a valid email'
      }
      return 'Username is required';
    }
    return null;
  }

  get nameValidation() {
    if (this.name?.errors && (this.name.touched || this.isSubmitAttempt)) {
      return 'Name is required';
    }
    return null;
  }

  get passwordValidation() {
    if (this.passwordControl?.errors && (this.passwordControl.touched || this.isSubmitAttempt)) {
      if (this.passwordControl?.errors['weak']) {
        return 'Please enter a strong password'
      }
      return 'Password is required';
    }
    return null;
  }

  get confirmPasswordValidation() {
    if (this.confirmPasswordControl?.errors && (this.confirmPasswordControl.touched || this.isSubmitAttempt)) {
      return 'Confirm password is required';
    } else if (this.registrationForm?.errors?.['mismatch'] && this.confirmPasswordControl.touched) {
      return 'Passwords do not match';
    }
    return null;
  }
}
