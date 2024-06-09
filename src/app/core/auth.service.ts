import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';
import { StateService } from './store/state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private storageKey = 'users';

  constructor(private state: StateService) { }

  getUsers(): User[] {
    const users = localStorage.getItem(this.storageKey);
    return users ? JSON.parse(users) : [];
  }

  registerUser(userData: User): boolean {
    try {
      const users = this.getUsers();
      users.push(userData);
      localStorage.setItem(this.storageKey, JSON.stringify(users));
      this.state.setUser(userData);
      return true;
    } catch (err) {
      console.error('registerUser:', err);
      return false;
    }
  }

  login(userData: User): boolean {
    let users = this.getUsers();
    const user = users.find(u => u.username === userData.username && u.password === userData.password);
    if (user) {
      this.state.setUser(user);
      return true;
    }
    return false;
  }

  logout() {
    this.state.setUser({} as User);
    return true;
  }
}

