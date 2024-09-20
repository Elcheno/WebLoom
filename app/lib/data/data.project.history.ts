import { QueryResult, sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { getSession } from '../actions/actions.auth';

export async function getProjectsHistory() {
  noStore();

  try {
    const session = await getSession();
    const user_id = session?.user?.id;

    if (!user_id) throw new Error('User not found');

    // let response: any | null = null;
    
    const data = await sql<any>`
      SELECT ph.id as history_id, ph.action, ph.created_at, pr.id as project_id, pr.name as project_name, pr.simple_name as project_simple_name, us.id as user_id, us.username FROM project_history ph
      LEFT JOIN projects pr ON ph.project_id = pr.id
      LEFT JOIN users us ON ph.user_id = us.id
      WHERE ph.user_id = ${user_id}
      ORDER BY ph.created_at DESC
      LIMIT 5
    `;

    // if (data.rows.length > 0) {
    //   response = {
    //     id: data.rows[0].id,
    //     name: data.rows[0].name,
    //     simple_name: data.rows[0].simple_name,
    //     url: data.rows[0].url,
    //     user_id: data.rows[0].user_id,
    //     description: data.rows[0].description,
    //     created_at: data.rows[0].created_at,
    //     visibility: data.rows[0].private_id 
    //       ? 'private' 
    //       : data.rows[0].public_id && 'public'
    //   } as Project;
    // }

    return data.rows;
  } catch (error) {
    console.error('Error fetching history projects:', error);
    throw new Error('Failed to fetch history projects')
  }
}
