import { fetchLastProject } from "@/app/lib/data";
import Card from "../../card";
import "./../projects-styles.css";
import LastProjectClientCard from "./last-project-card-client";
import { projectEntity } from "@/types/types";

export default async function LastProyectCard() {
  const lastProjectList: projectEntity[] | null = await fetchLastProject();

  if (lastProjectList && lastProjectList?.length > 0) {
    const lastProject = lastProjectList[0];

    return (
      <LastProjectClientCard lastProject={lastProject} />
    )
  } else {
    return (
      <Card>
        <div className="img-card-backdrop rounded-[2rem] h-full w-full">
          <div className="bg-white-primary backdrop-blur-[2.5px] bg-opacity-30 rounded-[2rem] flex flex-col gap-2 h-full w-full p-5">
            <h3 className="text-xl">Last Project</h3>
            <h3 className="text-2xl pl-2">No projects</h3>

            <div className="flex flex-row justify-center">
              <p className="text-lg">Try add one in <span className="underline"> `projects/add` </span></p>
            </div>
          </div>
        </div>
      </Card>
    )
  }

}