import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditUserDto, EditUserResponse, UserApiService } from '../../../api';
import { removeEmptyParams } from '../../shared/tools/functions';
import { UserInfo } from '../interfaces/user-info';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser?: UserInfo;

  constructor(private userApiService: UserApiService) {}

  get activeUser(): UserInfo | undefined {
    return this.currentUser;
  }

  set activeUser(userInfo: UserInfo | undefined) {
    this.currentUser = userInfo;
  }

  updateUser$(params: EditUserDto): Observable<EditUserResponse> {
    return this.userApiService.update(removeEmptyParams(params));
  }
}
