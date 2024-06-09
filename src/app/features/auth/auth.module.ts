import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { AuthService } from '../../core/auth.service';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [UserRegistrationComponent,LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  // providers:[AuthService]
})
export class AuthModule { }
