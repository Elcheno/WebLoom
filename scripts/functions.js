
const beforeDeleteProjectFunction = `
  CREATE OR REPLACE FUNCTION before_delete_project_function()
  RETURNS TRIGGER AS 
  $$
  BEGIN
    INSERT INTO project_history (project_id, user_id, action) VALUES (OLD.id, OLD.user_id, 'delete');
    RETURN OLD;
  END
  $$
  LANGUAGE plpgsql;
`

const afterCreateProjectFunction = `
  CREATE OR REPLACE FUNCTION after_create_project_function()
  RETURNS TRIGGER AS
  $$
  BEGIN
    INSERT INTO project_history (project_id, user_id, action) VALUES (NEW.id, NEW.user_id, 'create');
    RETURN NEW;
  END
  $$
  LANGUAGE plpgsql;
`

const afterUpdateProjectFunction = `
  CREATE OR REPLACE FUNCTION after_update_project_function()
  RETURNS TRIGGER AS
  $$
  BEGIN
    INSERT INTO project_history (project_id, user_id, action) VALUES (NEW.id, NEW.user_id, 'update');
    RETURN NEW;
  END
  $$
  LANGUAGE plpgsql;
`

module.exports = {
  beforeDeleteProjectFunction,
  afterCreateProjectFunction,
  afterUpdateProjectFunction
}

