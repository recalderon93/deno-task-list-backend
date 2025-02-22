import sql from "./client.ts";
import type {
  BoardIdInputType,
  BoardUserIdInputType,
  ChangeBoardOwnershipInputType,
  CreateBoardInputType,
  UpdateBoardNameInputType,
} from "validations/board.validation.ts";

export function getBoardByIdQuery(boardId: BoardIdInputType) {
  return sql`
  SELECT * FROM boards
  WHERE id = ${boardId}
  `;
}

export function getBoardsByUserQuery(userId: BoardUserIdInputType) {
  return sql`
    SELECT * FROM boards
    where owner_id = ${userId}
    ORDER BY updated_at DESC;
  `;
}

export function createBoardQuery(input: CreateBoardInputType) {
  const parseInput = {
    name: input.name,
    created_by: input.createdBy,
    owner_id: input.ownerId,
  };

  return sql`
    INSERT INTO boards ${sql(parseInput)}
    RETURNING *;
  `;
}

export function updateBoardTitleQuery(
  boardId: string,
  input: UpdateBoardNameInputType,
) {
  return sql`
    UPDATE boards
    SET ${sql(input)}
    WHERE id = ${boardId}
    RETURNING *;
  `;
}

export function changeBoardOwnershipQuery(
  boardId: string,
  input: ChangeBoardOwnershipInputType,
) {
  const parseInput = {
    owner_id: input.newOwnerId,
  };
  return sql`
    UPDATE boards
    SET ${sql(parseInput)}
    WHERE id = ${boardId}
    RETURNING *;
  `;
}

export function deleteBoardQuery(boardId: string) {
  return sql`
    DELETE FROM boards
    WHERE id = ${boardId}
    RETURNING *;
  `;
}
