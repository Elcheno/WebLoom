const typeActionSchema = `
  CREATE TYPE type_action AS ENUM ('create', 'update', 'delete');
`;

const typeProyectVisibilitySchema = `
  CREATE TYPE type_project_visibility AS ENUM ('public', 'private');
`;

module.exports = {
  typeActionSchema,
  typeProyectVisibilitySchema,
};
