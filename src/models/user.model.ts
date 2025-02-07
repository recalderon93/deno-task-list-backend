export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUsersInput {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
}

export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  email: string;
}
