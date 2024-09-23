const usersSchema = `
  CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    simple_username VARCHAR(255) NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    avatar_url TEXT NOT NULL DEFAULT 'https://t3.ftcdn.net/jpg/05/00/54/28/360_F_500542898_LpYSy4RGAi95aDim3TLtSgCNUxNlOlcM.jpg',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`;

const projectsSchema = `
  CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    simple_name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    url TEXT DEFAULT NULL,
    user_id UUID NOT NULL,
    project_visibility type_project_visibility NOT NULL DEFAULT 'private',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`;

const publicSchema = `
  CREATE TABLE IF NOT EXISTS public (
    project_id UUID NOT NULL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
  );
`;

const privateSchema = `
  CREATE TABLE IF NOT EXISTS private (
    project_id UUID NOT NULL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
  );
`;

const projectHistorySchema = `
  CREATE TABLE IF NOT EXISTS project_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID,
    user_id UUID,
    action type_action NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET NULL
  );
`;

const publicationsSchema = `
  CREATE TABLE IF NOT EXISTS publications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    public_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (public_id) REFERENCES public(project_id) ON DELETE CASCADE
  );
`;

module.exports = {
  usersSchema,
  projectsSchema,
  publicSchema,
  privateSchema,
  publicationsSchema,
  projectHistorySchema,
};
