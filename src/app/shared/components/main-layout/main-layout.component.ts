import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  name!: string;

  constructor(private authService: AuthService, private router: Router) {

  }
  onClickLogout() {
    if (this.authService.logout()) {
      this.router.navigate(['auth/login'])
    }
  }
}
