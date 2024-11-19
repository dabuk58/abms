import { UserDto } from '../../../api';
import { UserInfo } from '../../core/interfaces/user-info';

export function mapUser(user: UserDto): UserInfo {
  return {
    id: user.id!,
    email: user.email,
  };
}
