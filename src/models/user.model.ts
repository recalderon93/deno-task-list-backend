export interface User {
  id: string;
  firstname?: string;
  lastname?: string;
  email: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
