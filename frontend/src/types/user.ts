export interface User {
  username: string;
  name: string;
  email: string;
  description?: string;
  avatarUrl?: string;
  jwt: string;
  role: {
    name: string;
  };
}
