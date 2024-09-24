import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { getSession } from "../actions/actions.auth";
import { Project_History } from "../entity";

export async function getProjectsHistory() {
  noStore();

  try {
    const session = await getSession();
    const user_id = session?.user?.id;

    if (!user_id) throw new Error("User not found");

    await new Promise((resolve) => setTimeout(resolve, 5000));

    let response: Project_History[] = [];

    const data = await sql<any>`
      SELECT ph.id as history_id, ph.action, ph.created_at, pr.id as project_id, pr.name as project_name, pr.simple_name as project_simple_name, pr.url as url_project, us.id as user_id, us.username, us.avatar_url FROM project_history ph
      LEFT JOIN projects pr ON ph.project_id = pr.id
      LEFT JOIN users us ON ph.user_id = us.id
      WHERE ph.user_id = ${user_id}
      ORDER BY ph.created_at DESC
      LIMIT 5
    `;

    if (data.rows.length > 0) {
      response = data.rows.map((v) => {
        return {
          id: v.history_id,
          created_at: v.created_at,
          action: v.action,
          project: !v.project_id
            ? null
            : {
                id: v.project_id,
                name: v.project_name,
                simple_name: v.project_simple_name,
                url: v.url_project,
              },
          user: !v.user_id
            ? null
            : {
                id: v.user_id,
                username: v.username,
                avatar_url: v.avatar_url,
              },
        } as Project_History;
      }) as Project_History[];
    }

    return response;
  } catch (error) {
    console.error("Error fetching history projects:", error);
    throw new Error("Failed to fetch history projects");
  }
}
