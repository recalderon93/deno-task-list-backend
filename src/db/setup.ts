import sql from "./client.ts";

const UPDATE_AT_COLUMN_TRIGGER = "update_at_column_trigger";
const TRIGGER_SET_UPDATED_AT = "trigger_set_updated_at";

async function createUpdateAtColumnTriggerFunction() {
  try {
    await sql`
      CREATE OR REPLACE FUNCTION ${sql(UPDATE_AT_COLUMN_TRIGGER)}()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `;
    console.log("Update At column trigger defined.");
  } catch (e) {
    console.error("Error creating Trigger Function", e);
    Deno.exit(1);
  }
}

async function setUpUsersTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        firstname TEXT,
        lastname TEXT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
		`;

    await sql`DROP TRIGGER IF EXISTS ${sql(TRIGGER_SET_UPDATED_AT)} ON users;`;

    await sql`CREATE TRIGGER ${sql(TRIGGER_SET_UPDATED_AT)}
      BEFORE UPDATE ON users
      FOR EACH ROW
      EXECUTE FUNCTION ${sql(UPDATE_AT_COLUMN_TRIGGER)}();
    `;
    console.log("Set up Users table.");
  } catch (e) {
    console.error("Error setting up the users table", e);
    Deno.exit(1);
  }
}

async function setUpBoardsTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS boards (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        owner_id UUID NOT NULL REFERENCES users (id),
        created_by UUID NOT NULL REFERENCES users (id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
			`;

    await sql`DROP TRIGGER IF EXISTS ${sql(TRIGGER_SET_UPDATED_AT)} ON boards;`;

    await sql` 
      CREATE TRIGGER ${sql(TRIGGER_SET_UPDATED_AT)}
      BEFORE UPDATE ON boards
      FOR EACH ROW
      EXECUTE FUNCTION ${sql(UPDATE_AT_COLUMN_TRIGGER)}();
    `;

    console.log("Set Up Boards Table.");
  } catch (e) {
    console.error("Error setting up the boards table", e);
    Deno.exit(1);
  }
}

async function setUpTasksTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS tasks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        board_id UUID NOT NULL REFERENCES boards (id),
        title TEXT NOT NULL,
        description TEXT,
        status TEXT NOT NULL CHECK (status IN ('todo', 'paused', 'in-progress', 'done')),
        created_by UUID NOT NULL REFERENCES users (id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
			`;

    await sql`DROP TRIGGER IF EXISTS ${sql(TRIGGER_SET_UPDATED_AT)} ON tasks;`;
    await sql`
      CREATE TRIGGER ${sql(TRIGGER_SET_UPDATED_AT)}
      BEFORE UPDATE ON tasks
      FOR EACH ROW
      EXECUTE FUNCTION ${sql(UPDATE_AT_COLUMN_TRIGGER)}();
    `;
    console.log("Set Up Tasks Table");
  } catch (e) {
    console.error("Error setting up the tasks table", e);
    Deno.exit(1);
  }
}

async function dbInitialSetUp() {
  try {
    await createUpdateAtColumnTriggerFunction();
    await setUpUsersTable();
    await setUpBoardsTable();
    await setUpTasksTable();
    console.log("Database initial setup complete.");
    Deno.exit(0);
  } catch (error) {
    console.error("Error during database setup:", error);
    Deno.exit(1);
  }
}

dbInitialSetUp();
