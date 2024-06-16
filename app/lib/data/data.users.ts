import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

import {
  User
} from '@/app/lib/entity';

export async function getUsers() {
  noStore();
  try {
    console.log('Fetching users...');
    const data = await sql<User>`SELECT * FROM users`;
    return data.rows;

  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users')

  }
}

export async function getUserByEmail(email: string) {
  noStore();

  try {
    console.log('Fetching user by email...');
    const data = await sql<User>`
      SELECT * FROM users
      WHERE email = ${email}
    `;
    if (data.rows.length === 0) return null;
    return data.rows[0];
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user')
  }
}
