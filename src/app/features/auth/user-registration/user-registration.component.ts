import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.scss'
})
export class UserRegistrationComponent {
  registrationForm!: FormGroup;
  isSubmitAttempt: boolean = false;

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: this.passwordMatchValidator });
  }

  onSubmit() {
    this.isSubmitAttempt = true;
    if (this.registrationForm.valid) {
      this.authService.registerUser(this.registrationForm.value);
    } else {
      // Handle form validation errors
    }
  }

  passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  };// need to move 

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
    if (this.usernameControl.errors && (this.usernameControl.touched || this.isSubmitAttempt)) {
      if (this.usernameControl.errors['email']) {
        return 'Please enter a valid email'
      }
      return 'Username is required';
    }
    return null;
  }

  get nameValidation() {
    if (this.name.errors && (this.name.touched || this.isSubmitAttempt)) {
      return 'Name is required';
    }
    return null;
  }

  get passwordValidation() {
    if (this.passwordControl.errors && (this.passwordControl.touched || this.isSubmitAttempt)) {
      // if (this.passwordControl.errors['password']) {
      //   return 'Please enter a valid email'
      // }
      return 'Password is required';
    }
    return null;
  }

  get confirmPasswordValidation() {
    if (this.confirmPasswordControl.errors && (this.confirmPasswordControl.touched || this.isSubmitAttempt)) {
      return 'Confirm password is required';
    } else if (this.registrationForm.errors?.['mismatch'] && this.confirmPasswordControl.touched) {
      return 'Passwords do not match';
    }
    return null;
  }
}
