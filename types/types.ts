import { Database } from "./supabase";

export type userEntity = Database["public"]["Tables"]["users"]["Row"];
export type projectEntity = Database["public"]["Tables"]["projects"]["Row"];

export type projectPublic = projectEntity & { users: userEntity };