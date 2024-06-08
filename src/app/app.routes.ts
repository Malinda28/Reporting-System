import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

export const routes: Routes = [
    { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
    {
        path: '',
        component: MainLayoutComponent,
        loadChildren: () => import('./features/report/report.module').then(m => m.ReportModule)
    }
];