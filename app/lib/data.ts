import { createClient } from '@/utils/supabase/server';

const ITEMS_PER_PAGE = 6;

export async function fetchUsers() {

  const supabase = createClient();
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { data: users } = await supabase
    .from("users")
    .select()
    .order("created_at", { ascending: true });

  return users;
}

export async function fetchUser() {

  const supabase = createClient();
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { data: user } = await supabase
    .from("users")
    .select();

  return user;
}

export async function fetchProjects() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  await new Promise((resolve) => setTimeout(resolve, 250));

  const { data: projects } = await supabase
    .from("projects")
    .select()
    .eq("user_id", user?.id)
    .order("created_at", { ascending: true });    

  return projects;
}

export async function fetchProjectById(
  { id }
  : { 
    id: number 
  }
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  await new Promise((resolve) => setTimeout(resolve, 250));

  const { data: project } = await supabase
    .from("projects")
    .select()
    .eq("user_id", user?.id)
    .eq("id", id);

  return project;
}

export async function fetchProjectByName(
  { name }
  : { 
    name: string 
  }
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  await new Promise((resolve) => setTimeout(resolve, 250));

  const { data: project } = await supabase
    .from("projects")
    .select()
    .eq("user_id", user?.id)
    .eq("name", name);

  return project;
}

export async function fetchLastProject() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  await new Promise((resolve) => setTimeout(resolve, 250));

  const { data: project } = await supabase
    .from("projects")
    .select()
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })
    .limit(1);

  return project;
}

export async function fetchProjectsLive() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  await new Promise((resolve) => setTimeout(resolve, 250));

  const { data: projects } = await supabase
    .from("projects")
    .select()
    .eq("user_id", user?.id)
    .eq("visibility", "public");
    
  return projects;
}

export async function fetchProjectsPending() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  await new Promise((resolve) => setTimeout(resolve, 250));

  const { data: projects } = await supabase
    .from("projects")
    .select()
    .eq("user_id", user?.id)
    .eq("visibility", "private");

  return projects;
}

export async function fetchProjectsPage({ currentPage }: { currentPage: number }) {

  const supabase = createClient();
  await new Promise((resolve) => setTimeout(resolve, 250));

  const current_offset = ( ( currentPage - 1 ) * ITEMS_PER_PAGE );

  const offset_init = ( current_offset );
  const offset_end = ( offset_init + ITEMS_PER_PAGE ) - 1;  

  const { data: projects } = await supabase
    .from("projects")
    .select()
    .order("created_at", { ascending: false })
    .range(offset_init, offset_end);

  return projects;
}

export async function fetchProjectsFilteredPage({ query, currentPage, visibility }: { query: string, currentPage: number, visibility: string }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  await new Promise((resolve) => setTimeout(resolve, 250));

  const current_offset = ( ( currentPage - 1 ) * ITEMS_PER_PAGE );

  const offset_init = ( current_offset );
  const offset_end = ( offset_init + ITEMS_PER_PAGE ) - 1;

  if (visibility === 'all'){
    const { data: projects } = await supabase
      .from("projects")
      .select()
      .eq("user_id", user?.id)
      .ilike("name", `%${query}%`)
      .order("created_at", { ascending: false })
      .range(offset_init, offset_end);
    
    return projects;
  } else {
    const { data: projects } = await supabase
      .from("projects")
      .select()
      .eq("user_id", user?.id)
      .eq("visibility", visibility)
      .ilike("name", `%${query}%`)
      .order("created_at", { ascending: false })
      .range(offset_init, offset_end);

    return projects;
  }
} 
