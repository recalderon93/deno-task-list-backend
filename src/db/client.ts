import postgres from "npm:postgres";

const sql = postgres({
  user: Deno.env.get("DB_USERNAME") as string,
  password: Deno.env.get("DB_PASSWORD") as string,
  database: Deno.env.get("DB_DATABASE") as string,
  host: Deno.env.get("DB_HOST") as string,
  port: parseInt(Deno.env.get("DB_PORT") as string),
});

export default sql;
