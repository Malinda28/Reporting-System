import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { UserRegistrationComponent } from './features/auth/user-registration/user-registration.component';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) }
];