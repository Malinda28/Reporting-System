import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
    console.log(this.userState.getValue()) ;
  }
}
