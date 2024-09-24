"use server";

import { Private, Project, Public } from "@/app/lib/entity";
import { QueryResult, sql } from "@vercel/postgres";
import { z } from "zod";
import { getSession } from "@/app/lib/actions/actions.auth";
import { revalidatePath } from "next/cache";

const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  simple_name: z.string(),
  description: z.optional(z.string()),
  url: z.string().url().optional().or(z.literal("")),
  user_id: z.string(),
  created_at: z.string(),
});

const ProjectFormSchema = z.object({
  name: z.string(),
  description: z.optional(z.string()),
  visibility: z.enum(["public", "private"]),
  url: z.string().url().optional().or(z.literal("")),
});

const ProjectRemoveSchema = ProjectSchema.omit({
  user_id: true,
  created_at: true,
  name: true,
  simple_name: true,
  description: true,
  url: true,
});

const ProjectUpdateSchema = ProjectSchema.omit({
  user_id: true,
  created_at: true,
  simple_name: true,
});

const ProjectVisibilitySchema = z.object({
  id: z.string(),
  visibility: z.enum(["public", "private"]),
  actual_visibility: z.enum(["public", "private"]),
});

export async function insertProject(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const { name, description, visibility, url } = ProjectFormSchema.parse({
      name: formData.get("name"),
      description: formData.get("description"),
      visibility: formData.get("visibility"),
      url: formData.get("url"),
    });

    const session = await getSession();
    const user_id = session?.user?.id;

    if (!user_id) throw new Error("User not found");

    let projectData: QueryResult<Project>;

    if (url && url !== "") {
      projectData = await sql<Project>`
        INSERT INTO projects (name, simple_name, description, user_id, url, project_visibility)
        VALUES (${name}, ${name.toLocaleLowerCase()}, ${description}, ${user_id}, ${url}, ${visibility})
        RETURNING *
      `;
    } else {
      projectData = await sql<Project>`
        INSERT INTO projects (name, simple_name, description, user_id, project_visibility)
        VALUES (${name}, ${name.toLocaleLowerCase()}, ${description}, ${user_id}, ${visibility})
        RETURNING *
      `;
    }

    if (projectData && visibility === "public") {
      await sql<Public>`
        INSERT INTO public (project_id)
        VALUES (${projectData.rows[0].id})
      `;
    } else if (projectData && visibility === "private") {
      await sql<Private>`
        INSERT INTO private (project_id)
        VALUES (${projectData.rows[0].id})
      `;
    }
  } catch (error) {
    console.error(`Error to insert project: ${error}`);
    return "Error insert project";
  }
}

export async function removeProject(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const { id } = ProjectRemoveSchema.parse({
      id: formData.get("id"),
    });

    const session = await getSession();
    const user_id = session?.user?.id;

    if (!user_id) throw new Error("User not found");

    await sql`
      DELETE FROM projects WHERE id = ${id} AND user_id = ${user_id}
    `;
    revalidatePath("/projects");
  } catch (error) {
    console.error(`Error to remove project: ${error}`);
    return "Error remove project";
  }
}

export async function updateProject(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const { id, name, description, url } = ProjectUpdateSchema.parse({
      id: formData.get("id"),
      name: formData.get("name"),
      description: formData.get("description"),
      url: formData.get("url"),
    });

    const session = await getSession();
    const user_id = session?.user?.id;

    if (!user_id) throw new Error("User not found");

    await sql`
      UPDATE projects
      SET
      name = ${name},
      simple_name = ${name.toLocaleLowerCase()},
      description = ${description},
      url = ${url}
      WHERE id = ${id} AND user_id = ${user_id}
    `;
    revalidatePath("/dasboard/[username]/[project]");
  } catch (error) {
    console.error(`Error to update project: ${error}`);
    return "Error update project";
  }
}

export async function updateProjectVisibility(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const { id, visibility, actual_visibility } = ProjectVisibilitySchema.parse(
      {
        id: formData.get("id"),
        visibility: formData.get("visibility"),
        actual_visibility: formData.get("actual_visibility"),
      },
    );

    const session = await getSession();
    const user_id = session?.user?.id;

    if (!user_id) throw new Error("User not found");

    if (visibility === "public" && actual_visibility === "private") {
      await sql`
        DELETE FROM private WHERE project_id = ${id}
      `;
      await sql`
        INSERT INTO public (project_id)
        VALUES (${id})
      `;
      await sql`
        UPDATE projects
        SET project_visibility = ${visibility}
        WHERE pr.id = ${id}
      `;
    } else if (visibility === "private" && actual_visibility === "public") {
      await sql`
        DELETE FROM public WHERE project_id = ${id}
      `;
      await sql`
        INSERT INTO private (project_id)
        VALUES (${id})
      `;
      await sql`
        UPDATE projects
        SET project_visibility = ${visibility}
        WHERE pr.id = ${id}
      `;
    }

    revalidatePath("/dasboard/[username]/[project]");
  } catch (error) {
    console.error(`Error to update project: ${error}`);
    return "Error update project";
  }
}
