import { z } from "zod";
import { customValidator } from "utils/customValidator.ts";

const createBoardInputSchema = z.object({
  name: z.string(),
  ownerId: z.string().uuid(),
  createdBy: z.string().uuid(),
});

export type CreateBoardInputType = z.infer<typeof createBoardInputSchema>;

export const validateCreateBoardInput = (value: CreateBoardInputType) =>
  customValidator(createBoardInputSchema, value);

const updateBoardNameInputSchema = z.object({
  name: z.string(),
});

export type UpdateBoardNameInputType = z.infer<
  typeof updateBoardNameInputSchema
>;

export const validateUpdateBoardTitleInput = (
  value: UpdateBoardNameInputType,
) => customValidator(updateBoardNameInputSchema, value);

const changeBoardOwnershipInputSchema = z.object({
  newOwnerId: z.string(),
});

export type ChangeBoardOwnershipInputType = z.infer<
  typeof changeBoardOwnershipInputSchema
>;

export const validateChangeBoardOwnershipInput = (
  value: ChangeBoardOwnershipInputType,
) => customValidator(changeBoardOwnershipInputSchema, value);

const boardUserIdInputSchema = z.string().uuid();

export type BoardUserIdInputType = z.infer<typeof boardUserIdInputSchema>;

export const validateBoardUserIdInput = (value: BoardUserIdInputType) =>
  customValidator(boardUserIdInputSchema, value);

const boardIdInputSchema = z.string().uuid();

export type BoardIdInputType = z.infer<typeof boardIdInputSchema>;

export const validateBoardIdInput = (value: BoardIdInputType) =>
  customValidator(boardIdInputSchema, value);
