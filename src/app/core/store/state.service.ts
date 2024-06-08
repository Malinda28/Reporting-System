import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {


  private userState!: BehaviorSubject<User>;

  constructor() {
    this.userState = new BehaviorSubject(new User());
  }

  setUser(user: User) {
    this.userState.next(user);
    console.log(this.userState.getValue());
  }

  checkUserState() {
    console.log(this.userState.getValue().name);
    const isLoggedIn = !!this.userState.getValue().name;
    return of(isLoggedIn);
  }

  get currentUser() {
   return this.userState.getValue();
  }
}
