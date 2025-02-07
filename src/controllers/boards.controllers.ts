import type { Context } from "hono";
import type {
  Board,
  ChangeBoardOwnershipInput,
  CreateBoardInput,
  UpdateBoardTitleInput,
} from "models/board.model.ts";

export async function createBoardController(c: Context) {
  const input = await c.req.json<CreateBoardInput>();

  try {
    // #TODO Validate Input
    return c.json({
      message: "Error Creating New Board",
      data: input as Board,
    }, 201);
  } catch (e) {
    console.error(e);
    return c.json({
      message: "Error Creating Board",
    }, 400);
  }
}

export function deleteBoardController(c: Context) {
  const id = c.req.param("id");

  try {
    //#TODO Validate Id
    return c.json({
      message: "Board deleted",
      data: {
        id: id,
      } as Board,
    }, 201);
  } catch (e) {
    console.error(e);
    return c.json({
      message: "Error Deleting Board",
    }, 400);
  }
}

export function getBoardByIdController(c: Context) {
  const boardId = c.req.param("id");

  try {
    // #TODO Validate Input
    return c.json({
      message: "Board founded",
      data: {} as Board,
    });
  } catch (e) {
    console.error(e);
    return c.json({
      message: `Error Getting Board with Id=${boardId}`,
    }, 400);
  }
}

export function getBoardsByUserController(c: Context) {
  const userId = c.req.param("userId");

  try {
    // #TODO Validate UserId
    return c.json({
      message: "Boards founded.",
      data: [] as Board[],
    });
  } catch (e) {
    console.error(e);
    return c.json({
      message: `Error Getting user's boards with userId=${userId}`,
    });
  }
}

export async function updateBoardTitleController(c: Context) {
  const boardId = c.req.param("id");
  const data = await c.req.json<UpdateBoardTitleInput>();

  try {
    // #TODO Validate boardId and input

    return c.json({
      message: "Board title updated.",
      data: { ...data } as Board,
    });
  } catch (e) {
    console.error(e);

    return c.json({
      message: `Error updating board with Id=${boardId}`,
    });
  }
}

export async function changeBoardOwnershipController(c: Context) {
  const boardId = c.req.param("id");
  const data = await c.req.json<ChangeBoardOwnershipInput>();

  try {
    // Validate Input

    return c.json({
      message: `Board's Ownership changed to userId=${boardId}`,
      data: {
        ...data,
      },
    });
  } catch (e) {
    console.error(e);

    return c.json({
      message: "Error Changing Board Ownership",
    });
  }
}
