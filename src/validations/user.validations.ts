import { z } from "zod";
import { USERS } from "constants/api-messages.ts";
import { customValidator } from "../utils/customValidator.ts";

const createUserInputSchema = z.object({
  id: z.string({ message: USERS.ID_REQUIRED }),
  firstname: z.string({}),
  lastname: z.string({}),
  email: z.string().email(),
  username: z.string().min(4),
});

export type CreateUserInputType = z.infer<typeof createUserInputSchema>;

export function validateCreateUserInput(value: CreateUserInputType) {
  return customValidator(createUserInputSchema, value);
}

export const updateUserInputSchema = z.object({
  id: z.string({ message: USERS.ID_REQUIRED }),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  email: z.string().email().optional(),
  username: z.string().min(4).optional(),
});

export type UpdateUserInputType = z.infer<typeof updateUserInputSchema>;

export function validateUpdateUserInput(value: UpdateUserInputType) {
  return customValidator(updateUserInputSchema, value);
}

const userIdInputSchema = z.string({ message: USERS.ID_REQUIRED }).uuid();

export type UserIdInputType = z.infer<typeof userIdInputSchema>;

export function validateUserIdInput(value: UserIdInputType) {
  return customValidator(userIdInputSchema, value);
}
