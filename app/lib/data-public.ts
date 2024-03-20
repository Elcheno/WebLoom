import { createClient } from '@/utils/supabase/server';

const ITEMS_PER_PAGE = 6;

export async function fetchProjectsFilteredPagePublic({ query, currentPage }: { query: string, currentPage: number }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  await new Promise((resolve) => setTimeout(resolve, 250));

  const current_offset = ( ( currentPage - 1 ) * ITEMS_PER_PAGE );

  const offset_init = ( current_offset );
  const offset_end = ( offset_init + ITEMS_PER_PAGE ) - 1;

  if (query.startsWith('_')) {
    query = query.slice(1);
        
    const { data: projects } = await supabase
    .from("projects")
    .select(`
      *,
      users (
        *
      )
    `)
    .ilike("user_id", `%${query}%`)
    .eq("visibility", "public")
    .order("created_at", { ascending: false })
    .range(offset_init, offset_end);

    console.log(projects);
    
    return projects;

  } else {
    const { data: projects } = await supabase
    .from("projects")
    .select(`
      *,
      users (
        *
      )
    `)
    // .not("user_id", "eq", user?.id)
    .eq("visibility", "public")
    .ilike("name", `%${query}%`)
    .order("created_at", { ascending: false })
    .range(offset_init, offset_end);

    return projects;
  }

} 