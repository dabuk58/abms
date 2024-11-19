import { User } from '../../../api';
import { UserInfo } from '../../core/interfaces/user-info';

export function mapUser(user: User): UserInfo {
  return {
    id: user.id!,
    email: user.email,
  };
}
