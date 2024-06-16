"use server";

import { Private, Project, Public } from "@/app/lib/entity";
import { sql } from "@vercel/postgres";
import { z } from "zod";
import { getSession } from "@/app/lib/actions/actions.auth";

const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  simple_name: z.string(),
  description: z.string().optional(),
  url: z.string().optional(),
  user_id: z.string(),
  created_at: z.string()
});

const ProjectFormSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  visibility: z.enum(['public', 'private']),
  url: z.string().optional()
});

const ProjectRemoveSchema = ProjectSchema.omit({
  user_id: true,
  created_at: true,
  name: true,
  simple_name: true,
  description: true,
  url: true
})

const ProjectUpdateSchema = ProjectSchema.omit({
  user_id: true,
  created_at: true,
  simple_name: true
})

export async function insertProject(prevState: string | undefined, formData: FormData) {
  try {

    const { name, description, visibility } = ProjectFormSchema.parse({
      name: formData.get('name'),
      description: formData.get('description'),
      visibility: formData.get('visibility')
    })

    const session = await getSession();
    const user_id = session?.user?.id;

    if (!user_id) throw new Error('User not found');

    const projectData = await sql<Project>`
      INSERT INTO projects (name, simple_name, description, user_id)
      VALUES (${name}, ${name.toLocaleLowerCase()}, ${description}, ${user_id})
      RETURNING *
    `;
    
    if (visibility === 'public') {
      await sql<Public>`
        INSERT INTO public (project_id)
        VALUES (${projectData.rows[0].id})
      `;
    } else if (visibility === 'private') {
      await sql<Private>`
        INSERT INTO private (project_id)
        VALUES (${projectData.rows[0].id})
      `;
    }
    

  } catch (error) {
    console.error(`Error to insert project: ${error}`);
    return 'Error insert project';
  }
}

export async function removeProject(prevState: string | undefined, formData: FormData) {
  try {

    const { id } = ProjectRemoveSchema.parse({
      id: formData.get('id')
    })

    const session = await getSession();
    const user_id = session?.user?.id;

    if (!user_id) throw new Error('User not found');

    await sql`
      DELETE FROM projects WHERE id = ${id} AND user_id = ${user_id} CASCADE
    `

  } catch (error) {
    console.error(`Error to remove project: ${error}`);
    return 'Error remove project';
  }
}

export async function updateProject(prevState: string | undefined, formData: FormData) {
  try {

    const { id, name, description, url } = ProjectUpdateSchema.parse({
      id: formData.get('id'),
      name: formData.get('name'),
      description: formData.get('description'),
      url: formData.get('url')
    })

    const session = await getSession();
    const user_id = session?.user?.id;

    if (!user_id) throw new Error('User not found');

    await sql`
      UPDATE projects 
      SET 
      name = ${name},
      description = ${description},
      url = ${url}
      WHERE id = ${id} AND user_id = ${user_id}
    `

  } catch (error) {
    console.error(`Error to update project: ${error}`);
    return 'Error update project';
  }
}
