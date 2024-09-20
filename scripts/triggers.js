
const beforeDeleteProjectTrigger = `
  CREATE TRIGGER OR REPLACE before_delete_project_trigger
  BEFORE DELETE ON projects
  FOR EACH ROW
  EXECUTE PROCEDURE before_delete_project_function();
`

const afterCreateProjectTrigger = `
  CREATE TRIGGER OR REPLACE after_create_project_trigger
  AFTER INSERT ON projects
  FOR EACH ROW
  EXECUTE PROCEDURE after_create_project_function();
`

const afterUpdateProjectTrigger = `
  CREATE TRIGGER OR REPLACE after_update_project_trigger
  AFTER UPDATE ON projects
  FOR EACH ROW
  EXECUTE PROCEDURE after_update_project_function();
`

module.exports = {
  beforeDeleteProjectTrigger,
  afterCreateProjectTrigger,
  afterUpdateProjectTrigger
}

