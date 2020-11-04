export interface User {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  username: string;
  isStaff: boolean;
}

export interface ApiUser {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
}
