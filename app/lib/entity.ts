export type User = {
  id: string;
  name: string;
  username: string;
  simple_username: string;
  email: string;
  avatar_url: string;
  created_at: string;
};

export type Project = {
  id: string;
  name: string;
  simple_name: string;
  description: string;
  url: string;
  user_id: string;
  project_visibility: string;
  created_at: string;
};

export type Public = {
  project_id: string;
  created_at: string;
};

export type Private = {
  project_id: string;
  created_at: string;
};
