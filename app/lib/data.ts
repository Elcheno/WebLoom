import { createClient } from '@/utils/supabase/server';

export async function fetchUsers() {
  const supabase = createClient();
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { data: users } = await supabase
    .from("users")
    .select();

  return users;
}

export async function fetchUser() {
  const supabase = createClient();
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { data: user } = await supabase
    .from("users")
    .select()
    .eq("id", 1);

  return user;
}

export async function fetchProjects() {
  const supabase = createClient();
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { data: projects } = await supabase
    .from("projects")
    .select()
    .eq("users_id", 1)
    .order("date", { ascending: true });

  return projects;
}

export async function fetchProjectById(
  { id }
  : { 
    id: number 
  }
) {
  const supabase = createClient();

  const { data: project } = await supabase
    .from("projects")
    .select()
    .eq("users_id", 1)
    .eq("id", id);

  return project;
}

export async function fetchLastProject() {
  const supabase = createClient();
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { data: project } = await supabase
    .from("projects")
    .select()
    .eq("users_id", 1)
    .order("date", { ascending: false })
    .limit(1);

  return project;
}

export async function fetchProjectsLive() {
  const supabase = createClient();
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { data: projects } = await supabase
    .from("projects")
    .select()
    .eq("users_id", 1)
    .eq("state", "live");

  return projects;
}

export async function fetchProjectsPending() {
  const supabase = createClient();
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { data: projects } = await supabase
    .from("projects")
    .select()
    .eq("users_id", 1)
    .eq("state", "pending");

  return projects;
}

const ITEMS_PER_PAGE = 6;

export async function fetchProjectsPage({ currentPage }: { currentPage: number }) {
  const supabase = createClient();
  await new Promise((resolve) => setTimeout(resolve, 500));

  const current_offset = ( ( currentPage - 1 ) * ITEMS_PER_PAGE );

  const offset_init = ( current_offset );
  const offset_end = ( offset_init + ITEMS_PER_PAGE ) - 1;  

  const { data: projects } = await supabase
    .from("projects")
    .select()
    .eq("users_id", 1)
    .order("date", { ascending: false })
    .range(offset_init, offset_end);

  return projects;
}

export async function fetchProjectsFilteredPage({ query, currentPage, state }: { query: string, currentPage: number, state: string }) {
  const supabase = createClient();
  await new Promise((resolve) => setTimeout(resolve, 500));

  const current_offset = ( ( currentPage - 1 ) * ITEMS_PER_PAGE );

  const offset_init = ( current_offset );
  const offset_end = ( offset_init + ITEMS_PER_PAGE ) - 1;

  if (state === 'all'){
    const { data: projects } = await supabase
      .from("projects")
      .select()
      .eq("users_id", 1)
      .ilike("name", `%${query}%`)
      .order("date", { ascending: false })
      .range(offset_init, offset_end);

    return projects;
  } else {
    const { data: projects } = await supabase
      .from("projects")
      .select()
      .eq("users_id", 1)
      .eq("state", state)
      .ilike("name", `%${query}%`)
      .order("date", { ascending: false })
      .range(offset_init, offset_end);

    return projects;
  }
} 
