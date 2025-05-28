export interface EmailAccount {
  id: string;
  name: string;
  email: string;
  department: string;
  description: string;
}

export interface User {
  username: string;
  password: string;
  isAdmin: boolean;
}