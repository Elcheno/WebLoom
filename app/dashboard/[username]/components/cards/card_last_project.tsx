import { getMyLastProject } from "@/app/lib/data/data.projects";
import CardLastProjectClient from "./card_last_project_client";
import { getSession } from "@/app/lib/actions/actions.auth";

export default async function CardLastProject() {
  const last_project = await getMyLastProject();
  const session = await getSession();
  const session_user = session?.user;

  return (
    <CardLastProjectClient
      data={last_project.length > 0 ? last_project[0] : null}
      session_user={session_user}
    />
  );
}
