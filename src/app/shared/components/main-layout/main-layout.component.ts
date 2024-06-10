import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { StateService } from '../../../core/store/state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  name!: string;
  userSub!: Subscription;

  constructor(private authService: AuthService, private router: Router, private stateService: StateService) {
  }
  onClickLogout() {
    if (this.authService.logout()) {
      this.router.navigate(['auth/login'])
    }
  }

  ngOnInit(): void {
    this.userSub = this.stateService.userState$().subscribe(u => {
      this.name = u.name;
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
