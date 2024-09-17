
export type Project = {
  id: string,
  name: string,
  simple_name: string,
  description: string,
  url: string,
  user_id: string,
  created_at: string,
  visibility: 'public' | 'private'
}
