import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

import {
  Project,
} from '@/app/lib/entity';
import { getSession } from '../actions/actions.auth';

export async function getPublicProjects() {
  // noStore();

  // try {
  //   const data = await sql<Project>`
  //     SELECT pr.* FROM public pu
  //    ; INNER JOIN projects pr ON pu.project_id = pr.id
  //     ORDER BY pu.created_at
  //   `;

  //   return data.rows;

  // } catch (error) {
  //   console.error('Error fetching public projects:', error);
  //   throw new Error('Failed to fetch public projects')
  // }
}

export async function getMyPublicProjects() {
  // noStore();

  // try {
  //   const session = await getSession();
  //   const user_id = session?.user?.id;

  //   if (!user_id) throw new Error('User not found');

  //   const data = await sql<Project>`
  //     SELECT pr.* FROM public pu
  //     INNER JOIN projects pr ON pu.project_id = pr.id
  //     WHERE pr.user_id = ${user_id}
  //     ORDER BY pu.created_at
  //   `;

  //   return data.rows;
  // } catch (error) {
  //   console.error('Error fetching public projects:', error);
  //   throw new Error('Failed to fetch public projects')
  // }
}

export async function getMyPrivateProjects() {
  // noStore();

  // try {
  //   const session = await getSession();
  //   const user_id = session?.user?.id;
  
  //   if (!user_id) throw new Error('User not found');

  //   const data = await sql<Project>`
  //     SELECT pr.* FROM private pv
  //     INNER JOIN projects pr ON pv.project_id = pr.id
  //     WHERE pr.user_id = ${user_id}
  //     ORDER BY pv.created_at 
  //   `;

  //   return data.rows;
  // } catch (error) {
  //   console.error('Error fetching private projects:', error);
  //   throw new Error('Failed to fetch private projects')
  // }
}

export async function getMyLastProject() {
  // noStore();

  // try {
  //   const session = await getSession();
  //   const user_id = session?.user?.id;

  //   if (!user_id) throw new Error('User not found');

  //   const data = await sql<Project>`
  //     SELECT pr.* FROM projects pr
  //     WHERE pr.user_id = ${user_id}
  //     ORDER BY pr.created_at DESC
  //     LIMIT 1
  //   `;

  //   return data.rows[0]; 
  // } catch (error) {
  //   console.error('Error fetching last project:', error);
  //   throw new Error('Failed to fetch last project')
  // }
}

export async function getMyCountPublicProjects() {
  // noStore();

  // try {
  //   const session = await getSession();
  //   const user_id = session?.user?.id;

  //   if (!user_id) throw new Error('User not found');

  //   const data = await sql<any>`
  //     SELECT COUNT(*) FROM public pu
  //     INNER JOIN projects pr ON pu.project_id = pr.id
  //     WHERE pr.user_id = ${user_id}
  //   `;

  //   return data.rows[0].count;
  // } catch (error) {
  //   console.error('Error fetching public projects:', error);
  //   throw new Error('Failed to fetch public projects')
  // }
}

export async function getMyCountPrivateProjects() {
  // noStore();

  // try {
  //   const session = await getSession();
  //   const user_id = session?.user?.id;

  //   if (!user_id) throw new Error('User not found');

  //   const data = await sql<any>`
  //     SELECT COUNT(*) FROM private pv
  //     INNER JOIN projects pr ON pv.project_id = pr.id
  //     WHERE pr.user_id = ${user_id}
  //   `;

  //   return data.rows[0].count;
  // } catch (error) {
  //   console.error('Error fetching count private projects:', error);
  //   throw new Error('Failed to fetch count private projects')
  // }
}
