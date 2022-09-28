import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  user: any;

  currentUser(userFromLogin: any) {
    this.user = userFromLogin;
  }

  getCurrentUser():any {
   return this.user;
  }
}
