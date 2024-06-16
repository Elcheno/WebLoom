const { db } = require('@vercel/postgres');
const {
  usersSchema,
  projectsSchema,
  publicSchema,
  privateSchema,
  publicationsSchema
} = require('./schema.js');

async function createUserTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.query(usersSchema);

    return {
      createTable
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createProjectsTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.query(projectsSchema);

    return {
      createTable
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createPublicTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.query(publicSchema);

    return {
      createTable
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createPrivateTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.query(privateSchema);

    return {
      createTable
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createPublications(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.query(publicationsSchema);

    return {
      createTable
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();

  // create tables
  await createUserTable(client);
  await createProjectsTable(client);
  await createPublicTable(client);
  await createPrivateTable(client);
  // await createPublications(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
})

module.exports = main
