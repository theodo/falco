import { ApiUser, User } from './types';

export const modelizeUser = (user: ApiUser): User => ({
  firstName: user.first_name,
  lastName: user.last_name,
  emailAddress: user.email,
});
