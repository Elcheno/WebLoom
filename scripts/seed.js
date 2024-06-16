const { db } = require('@vercel/postgres');
const {
  users,
  projects,
  public,
  private
} = require('../app/lib/placeholder-data.js');

async function seedUsers(client) {
  try {
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        return client.sql`
          INSERT INTO users (id, name, username, simple_username, email, created_at)
          VALUES (${user.id}, ${user.name}, ${user.username}, ${user.simple_username}, ${user.email}, ${user.created_at})
          ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      users: insertedUsers
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedProjects(client) {
  try {
    const insertedProjects = await Promise.all(
      projects.map(async (project) => {
        return client.sql`
          INSERT INTO projects (id, name, simple_name, description, url, user_id, created_at)
          VALUES (${project.id}, ${project.name}, ${project.simple_name}, ${project.description}, ${project.url}, ${project.user_id}, ${project.created_at})
          ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );

    console.log(`Seeded ${insertedProjects.length} projects`);

    return {
      projects: insertedProjects
    };
  } catch (error) {
    console.error('Error seeding projects:', error);
    throw error;
  }
} 

async function seedPublic(client) {
  try {
    const insertedPublics = await Promise.all(
      public.map(async (pub) => {
        return client.sql`
          INSERT INTO public (project_id, created_at)
          VALUES (${pub.project_id}, ${pub.created_at});
        `;
      }),
    );

    console.log(`Seeded ${insertedPublics.length} publics`);

    return {
      public: insertedPublics
    };
  } catch (error) {
    console.error('Error seeding public:', error);
    throw error;
  }
}

async function seedPrivate(client) {
  try {
    const insertedPrivate = await Promise.all(
      private.map(async (priv) => {
        return client.sql`
          INSERT INTO private (project_id, created_at)
          VALUES (${priv.project_id}, ${priv.created_at});
        `;
      }),
    );

    console.log(`Seeded ${insertedPrivate.length} privates`);

    return {
      private: insertedPrivate
    };
  } catch (error) {
    console.error('Error seeding private:', error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();
  
  await seedUsers(client);
  await seedProjects(client);
  await seedPublic(client);
  await seedPrivate(client);
  
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});

module.exports = main
