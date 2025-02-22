import { Context } from "hono";

/**
 * # apiResponse
 * @function
 * @description Helper that implement Hono Context to generate
 * standard API responses.
 */
export function apiResponse<T>(
  c: Context,
  data: T,
  message: string,
  status: number = 200,
  rawError?: unknown,
) {
  return c.json({
    message,
    data,
    status,
    error: rawError ? getResponseError(rawError) : undefined,
  });
}

function getResponseError(error: unknown) {
  let responseError: unknown = error;

  try {
    if (error instanceof Error && error.message) {
      const parseError = JSON.parse(error.message);

      if (
        parseError && parseError instanceof Object &&
        parseError?.code === "InputError"
      ) {
        responseError = parseError;
      }
    }

    return responseError;
  } catch (_e) {
    return error;
  }
}
