const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export function getErrorStatus(e: unknown) {
  if (e instanceof Error && e.message) {
    console.log(e.message);
    try {
      const parsedError = JSON.parse(e.message);

      if (
        parsedError instanceof Object && parsedError.code &&
        parsedError.code === "InputError"
      ) {
        return HTTP_STATUS.BAD_REQUEST;
      }
    } catch (_e) {
      return HTTP_STATUS.INTERNAL_SERVER_ERROR;
    }
  }

  return HTTP_STATUS.INTERNAL_SERVER_ERROR;
}

export default HTTP_STATUS;
