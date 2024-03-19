import { fetchLastProject } from "@/app/lib/data";
import Card from "../../card";
import { ArrowUpRightFromSquare } from "lucide-react";
import "./../projectsStyles.css";
import LastProjectClientCard from "./last-project-client-card";

export default async function LastProyectCard() {
  const lastProjectList = await fetchLastProject();

  if (lastProjectList && lastProjectList?.length > 0) {
    const lastProject = lastProjectList[0];

    return (
      <LastProjectClientCard lastProject={lastProject} />
    )
  } else {
    return (
      <Card>
        <p className="text-3xl">No hay proyectos</p>
      </Card>
    )
  }

}