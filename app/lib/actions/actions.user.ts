import { z } from "zod";
import { getUserByEmail } from "@/app/lib/data/data.users";
import { UserExistError } from "@/app/lib/handleError";
import { QueryResult, sql } from "@vercel/postgres";
import { User } from "@/app/lib/entity";

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  created_at: z.string(),
  avatar_url: z.optional(z.string()),
  username: z.string(),
  simple_username: z.string()
});

const UserFormSchema = UserSchema.omit({
  id: true,
  created_at: true,
  simple_username: true
});

export async function insertUser(formData: FormData) {
  try {
    console.log(formData);
    
    const { name, email, username, avatar_url } = UserFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      username: formData.get('username'),
      avatar_url: formData.get('avatar_url') ?? null
    })

    const user = await getUserByEmail(email);
    if (user) throw new UserExistError('User already exists');

    let data: QueryResult<User> | null = null;
    console.log(`Creating user: ${name}, ${email}, ${username}, ${avatar_url}`);
    
    if (avatar_url) {
      data = await sql<User>`
        INSERT INTO users (name, email, username, simple_username, avatar_url)
        VALUES (${name}, ${email}, ${username}, ${username.toLocaleLowerCase()}, ${avatar_url})
        RETURNING *
      `;
    } else {
      data = await sql<User>`
        INSERT INTO users (name, email, username, simple_username)
        VALUES (${name}, ${email}, ${username}, ${username.toLocaleLowerCase()})
        RETURNING *
      `;
    }

    if (!data?.rows[0]) throw new Error('Error to create user');
    return data.rows[0];
  } catch (error) {
    console.error(`Error to create user: ${error}`);
    throw error;
  }
}
