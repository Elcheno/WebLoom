
const typeActionSchema = `
  CREATE TYPE IF NOT EXISTS type_action AS ENUM ('create', 'update', 'delete');
`
module.exports = {
  typeActionSchema
}
