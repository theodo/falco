import { ApiUser, User } from './types';

export const modelizeUser = (user: ApiUser): User => ({
  id: user.id,
  firstName: user.first_name,
  lastName: user.last_name,
  emailAddress: user.email,
  username: user.username,
  isStaff: user.is_staff,
});
