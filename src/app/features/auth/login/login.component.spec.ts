import { ComponentFixture, TestBed } from '@angular/core/testing';
 import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { MessagesModule } from 'primeng/messages';
import { FormsModule, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule, MessagesModule, FormsModule, ReactiveFormsModule],
      providers: [NgControl, { provide: AuthService }]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values and required validators', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.usernameControl.value).toEqual('');
    expect(component.passwordControl.value).toEqual('');
    expect(component.usernameControl.hasValidator(Validators.required)).toBeTrue();
    expect(component.passwordControl.hasValidator(Validators.required)).toBeTrue();
  });

  it('should return correct usernameValidation message', () => {
    component.isSubmitAttempt = true;
    component.usernameControl.setValue('');
    component.usernameControl.markAsTouched();
    expect(component.usernameValidation).toEqual('Username is required');
  });

  it('should return correct passwordValidation message', () => {
    component.isSubmitAttempt = true;
    component.passwordControl.setValue('');
    component.passwordControl.markAsTouched();
    expect(component.passwordValidation).toEqual('Password is required');
  });

  it('should show error message on failed login', () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    component.loginForm.setValue({ username: 'invaliduser', password: 'invalidpassword' });
    component.onSubmit();
     
    expect(component.msgs.length).toBe(1);
    expect(component.msgs[0].detail).toEqual('Username or password invalid');
  });

});
