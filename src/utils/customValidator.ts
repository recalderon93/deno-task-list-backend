import { ZodSchema } from "zod";

export async function customValidator(schema: ZodSchema, value: unknown) {
  const validation = await schema.safeParseAsync(value);

  if (!validation.success) {
    const errors = validation.error.issues.map((item) => ({
      fieldName: item.path[0],
      message: item.message,
    }));

    throw new Error(JSON.stringify({
      code: "InputError",
      message: "Error on input value.",
      fields: errors,
    }));
  }
}
