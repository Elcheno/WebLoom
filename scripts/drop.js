const { db } = require("@vercel/postgres");

async function dropUsers(client) {
  try {
    await client.sql`
      DROP TABLE IF EXISTS users CASCADE;
    `;
    console.log("DROP TABLE USERS");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function dropProjects(client) {
  try {
    await client.sql`
      DROP TABLE IF EXISTS projects CASCADE;
    `;

    console.log("DROP TABLE PROJECTS");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function dropPrivate(client) {
  try {
    await client.sql`
      DROP TABLE IF EXISTS private CASCADE;
    `;

    console.log("DROP TABLE PRIVATE");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function dropPublic(client) {
  try {
    await client.sql`
      DROP TABLE IF EXISTS public CASCADE;
    `;

    console.log("DROP TABLE PUBLIC");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function dropPublications(client) {
  try {
    await client.sql`
      DROP TABLE IF EXISTS publications CASCADE;
    `;

    console.log("DROP TABLE PUBLICATIONS");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function dropProjectHistory(client) {
  try {
    await client.sql`
      DROP TABLE IF EXISTS project_history CASCADE;
    `;

    console.log("DROP TABLE PROJECT_HISTORY");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function dropBeforeDeleteProjectFunction(client) {
  try {
    await client.sql`
      DROP FUNCTION IF EXISTS before_delete_project_function CASCADE;
    `;

    console.log("DROP FUNCTION BEFORE_DELETE_PROJECT");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function dropAfterCreateProjectFunction(client) {
  try {
    await client.sql`
      DROP FUNCTION IF EXISTS after_create_project_function CASCADE;
    `;

    console.log("DROP FUNCTION AFTER_CREATE_PROJECT");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function dropAfterUpdateProjectFunction(client) {
  try {
    await client.sql`
      DROP FUNCTION IF EXISTS after_update_project_function CASCADE;
    `;

    console.log("DROP FUNCTION AFTER_UPDATE_PROJECT");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function dropActionType(client) {
  try {
    await client.sql`
      DROP TYPE IF EXISTS type_action CASCADE;
    `;

    console.log("DROP TYPE ACTION");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function dropProjectVisibilityType(client) {
  try {
    await client.sql`
      DROP TYPE IF EXISTS type_project_visibility CASCADE;
    `;

    console.log("DROP TYPE PROJECT_VISIBILITY");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  // TABLES
  await dropUsers(client);
  await dropProjects(client);
  await dropPrivate(client);
  await dropPublic(client);
  await dropPublications(client);
  await dropProjectHistory(client);

  // FUNCTIONS
  await dropBeforeDeleteProjectFunction(client);
  await dropAfterCreateProjectFunction(client);
  await dropAfterUpdateProjectFunction(client);

  // TYPES
  await dropActionType(client);
  await dropProjectVisibilityType(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err,
  );
});

module.exports = main;
