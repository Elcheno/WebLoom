import { fetchProjectsPending } from "@/app/lib/data";
import Card from "../../card";
import { projectEntity } from "@/types/types";

export default async function CountPendingProjectsCars() {
  const projectsPending: projectEntity[] | null = await fetchProjectsPending();
  const numberProjects = projectsPending ? projectsPending.length : 0;

  return (
    <Card>
      <div className="w-full h-full p-5 flex flex-col">
        <h3 className="text-xl w-full">Private Projects</h3>
        <div className="flex justify-center items-center h-full">
          <p className="text-[4rem]">{ numberProjects }</p>
        </div>
      </div>
    </Card>
  ) 
}