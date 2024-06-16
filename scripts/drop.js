const { db } = require('@vercel/postgres');

async function dropUsers(client) {
  try {
    await client.sql`
      DROP TABLE IF EXISTS users CASCADE;
    `;
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
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await dropUsers(client);
  await dropProjects(client);
  await dropPrivate(client);
  await dropPublic(client);
  // await dropPublications(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
})

module.exports = main
