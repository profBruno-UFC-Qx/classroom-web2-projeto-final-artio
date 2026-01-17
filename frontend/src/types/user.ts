export interface User {
  id: number;
  name: string;
  email: string;
  jwt: string;
  role: {
    name: string;
  };
}
