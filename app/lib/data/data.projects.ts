import { QueryResult, sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

import { Project as projectEntity } from "@/app/lib/entity";
import { getSession } from "../actions/actions.auth";
import { Project } from "@/lib/types";

export async function getPublicProjects() {
  // noStore();
  // try {
  //   const data = await sql<Project>`
  //     SELECT pr.* FROM public pu
  //     INNER JOIN projects pr ON pu.project_id = pr.id
  //     ORDER BY pu.created_at
  //   `;
  //   return data.rows;
  // } catch (error) {
  //   console.error('Error fetching public projects:', error);
  //   throw new Error('Failed to fetch public projects')
  // }
}

export async function getMyProjectsFiltered({
  query,
  visibility,
  page,
}: {
  query: string;
  visibility: string;
  page: number;
}) {
  noStore();
  try {
    const session = await getSession();
    const user_id = session?.user?.id;

    if (!user_id) throw new Error("User not found");

    await new Promise((resolve) => setTimeout(resolve, 500));

    let data: QueryResult<projectEntity>;

    if (visibility === "private" || visibility === "public") {
      data = await sql<projectEntity>`
        SELECT pr.* FROM projects pr
        WHERE pr.name ILIKE ${"%" + query + "%"}
        AND pr.user_id = ${user_id}
        AND pr.project_visibility = ${visibility}
        ORDER BY pr.created_at
      `;
    } else {
      data = await sql<projectEntity>`
        SELECT pr.* FROM projects pr
        WHERE pr.name ILIKE ${"%" + query + "%"}
        AND pr.user_id = ${user_id}
        ORDER BY pr.created_at
      `;
    }

    const result = data.rows.map((project: projectEntity) => {
      return {
        id: project.id,
        name: project.name,
        simple_name: project.simple_name,
        url: project.url,
        user_id: project.user_id,
        description: project.description,
        project_visibility: project.project_visibility,
        created_at: project.created_at,
      } as Project;
    }) as Project[];

    return result;
  } catch (error) {
    console.error("Error fetching my projects:", error);
    throw new Error("Failed to fetch my projects");
  }
}

export async function getMyPublicProjects() {
  noStore();

  try {
    const session = await getSession();
    const user_id = session?.user?.id;

    if (!user_id) throw new Error("User not found");

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const data = await sql<projectEntity>`
      SELECT pr.* FROM public pu
      INNER JOIN projects pr ON pu.project_id = pr.id
      WHERE pr.user_id = ${user_id}
      ORDER BY pu.created_at
    `;

    const result = data.rows.map((project: projectEntity) => {
      return {
        id: project.id,
        name: project.name,
        simple_name: project.simple_name,
        url: project.url,
        user_id: project.user_id,
        description: project.description,
        created_at: project.created_at,
        project_visibility: "public",
      } as Project;
    }) as Project[];

    return result;
  } catch (error) {
    console.error("Error fetching public projects:", error);
    throw new Error("Failed to fetch public projects");
  }
}

export async function getMyPrivateProjects() {
  noStore();

  try {
    const session = await getSession();
    const user_id = session?.user?.id;

    if (!user_id) throw new Error("User not found");

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const data = await sql<projectEntity>`
      SELECT pr.* FROM private pu
      INNER JOIN projects pr ON pu.project_id = pr.id
      WHERE pr.user_id = ${user_id}
      ORDER BY pu.created_at
    `;

    const result = data.rows.map((project: projectEntity) => {
      return {
        id: project.id,
        name: project.name,
        simple_name: project.simple_name,
        url: project.url,
        user_id: project.user_id,
        description: project.description,
        created_at: project.created_at,
        project_visibility: "private",
      } as Project;
    }) as Project[];

    return result;
  } catch (error) {
    console.error("Error fetching private projects:", error);
    throw new Error("Failed to fetch private projects");
  }
}

export async function getMyLastProject() {
  noStore();

  try {
    const session = await getSession();
    const user_id = session?.user?.id;

    if (!user_id) throw new Error("User not found");

    await new Promise((resolve) => setTimeout(resolve, 2500));

    const data = await sql<projectEntity>`
      SELECT pr.* FROM projects pr
      WHERE pr.user_id = ${user_id}
      ORDER BY pr.created_at DESC
      LIMIT 1
    `;

    const result = data.rows.map((project: projectEntity) => {
      return {
        id: project.id,
        name: project.name,
        simple_name: project.simple_name,
        url: project.url,
        user_id: project.user_id,
        description: project.description,
        created_at: project.created_at,
        project_visibility: "private",
      } as Project;
    }) as Project[];

    return result;
  } catch (error) {
    console.error("Error fetching last project:", error);
    throw new Error("Failed to fetch last project");
  }
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

export async function getMyProjectBySimpleName(simple_name: string) {
  noStore();

  try {
    const session = await getSession();
    const user_id = session?.user?.id;

    if (!user_id) throw new Error("User not found");

    // await new Promise((resolve) => setTimeout(resolve, 10000));

    let response: Project | null = null;

    const data = await sql<projectEntity>`
      SELECT pr.* FROM projects pr
      WHERE pr.user_id = ${user_id}
      AND pr.simple_name = ${simple_name}
    `;

    if (data.rows.length > 0) {
      response = {
        id: data.rows[0].id,
        name: data.rows[0].name,
        simple_name: data.rows[0].simple_name,
        url: data.rows[0].url,
        user_id: data.rows[0].user_id,
        description: data.rows[0].description,
        created_at: data.rows[0].created_at,
        visibility: data.rows[0].project_visibility,
      } as Project;
    }

    return response;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw new Error("Failed to fetch project");
  }
}
