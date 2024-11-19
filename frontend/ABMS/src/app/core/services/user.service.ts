import { Injectable } from '@angular/core';
import { UserInfo } from '../interfaces/user-info';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser?: UserInfo;

  constructor() {}

  get activeUser(): UserInfo | undefined {
    return this.currentUser;
  }

  set activeUser(userInfo: UserInfo | undefined) {
    this.currentUser = userInfo;
  }
}
