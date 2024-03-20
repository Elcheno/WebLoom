import { createClient } from '@/utils/supabase/server';

const ITEMS_PER_PAGE = 6;

export async function fetchProjectsFilteredPagePublic({ query, currentPage }: { query: string, currentPage: number }) {
  const supabase = createClient();
  await new Promise((resolve) => setTimeout(resolve, 250));

  const current_offset = ( ( currentPage - 1 ) * ITEMS_PER_PAGE );

  const offset_init = ( current_offset );
  const offset_end = ( offset_init + ITEMS_PER_PAGE ) - 1;

  const { data: projects } = await supabase
  .from("projects")
  .select(`
    *,
    users (
      *
    )
  `)
  .eq("visibility", "public")
  .ilike("name", `%${query}%`)
  .order("created_at", { ascending: false })
  .range(offset_init, offset_end);

  return projects;
} 

export async function fetchProfilesFilteredPagePublic({ query, currentPage }: { query: string, currentPage: number }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  await new Promise((resolve) => setTimeout(resolve, 250));

  const current_offset = ( ( currentPage - 1 ) * ITEMS_PER_PAGE );

  const offset_init = ( current_offset );
  const offset_end = ( offset_init + ITEMS_PER_PAGE ) - 1;

  const { data: users } = await supabase
  .from("users")
  .select(`*, projects_count:projects(count)`)
  .not("id", "eq", user?.id)
  .ilike("user_name", `%${query}%`)
  .order("created_at", { ascending: false })
  .range(offset_init, offset_end);

  console.log(users);
  
  return users;
} 