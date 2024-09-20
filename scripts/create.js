const { db } = require('@vercel/postgres');
const {
  usersSchema,
  projectsSchema,
  publicSchema,
  privateSchema,
  publicationsSchema,
  projectHistorySchema
} = require('./schema.js');

const {
  typeActionSchema
} = require('./types.js');

const {
  beforeDeleteProjectFunction,
  afterCreateProjectFunction,
  afterUpdateProjectFunction
} = require('./functions.js');

const {
  beforeDeleteProjectTrigger,
  afterCreateProjectTrigger,
  afterUpdateProjectTrigger
} = require('./triggers.js');

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

async function createProjectHistoryTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.query(projectHistorySchema);

    return {
      createTable
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createActionType(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createType = await client.query(typeActionSchema);

    return {
      createType
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createBeforeDeleteProjectFunction(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createFunction = await client.query(beforeDeleteProjectFunction);

    return {
      createFunction
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createAfterCreateProjectFunction(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    
    const createFunction = await client.query(afterCreateProjectFunction);
    return {
      createFunction
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createAfterUpdateProjectFunction(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createFunction = await client.query(afterUpdateProjectFunction);

    return {
      createFunction
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createBeforeDeleteProjectTrigger(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTrigger = await client.query(beforeDeleteProjectTrigger);

    return {
      createTrigger
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createAfterCreateProjectTrigger(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTrigger = await client.query(afterCreateProjectTrigger);

    return {
      createTrigger
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createAfterUpdateProjectTrigger(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTrigger = await client.query(afterUpdateProjectTrigger);

    return {
      createTrigger
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();

  // create types
  await createActionType(client);

  // create tables
  await createUserTable(client);
  await createProjectsTable(client);
  await createPublicTable(client);
  await createPrivateTable(client);
  // await createPublications(client);
  // await createProjectHistoryTable(client);

  // create functions
  // await createBeforeDeleteProjectFunction(client);
  // await createAfterCreateProjectFunction(client);
  // await createAfterUpdateProjectFunction(client);

  // create triggers
  // await createBeforeDeleteProjectTrigger(client);
  // await createAfterCreateProjectTrigger(client);
  // await createAfterUpdateProjectTrigger(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
})

module.exports = main
