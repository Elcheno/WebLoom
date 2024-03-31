import { Database } from "./supabase";

export type userEntity = Database["public"]["Tables"]["users"]["Row"] & { projects_count?: { count: number }[] };
export type projectEntity = Database["public"]["Tables"]["projects"]["Row"];
export type likeEntity = Database["public"]["Tables"]["likes"]["Row"];

export type projectPublic = projectEntity & { users: userEntity } & { likes_count: { count: number }[] } & { like: { id: string }[] };
export type likePublic = likeEntity & { project_id: string }

export type likePublicEntity = {
  id: string;
  state: boolean,
  numberLikes: number,
  project_id: string
}