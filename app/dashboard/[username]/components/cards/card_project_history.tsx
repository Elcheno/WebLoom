import { getProjectsHistory } from "@/app/lib/data/data.project.history";
import CardProjectHistoryClient from "./card_project_history_client";

export default async function CardProjectHistory() {
  const project_history = await getProjectsHistory();

  return <CardProjectHistoryClient data={project_history} />;
}
