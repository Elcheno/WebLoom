import { fetchProjectsLive, fetchProjectsPending } from "@/app/lib/data";
import ChartCircle from "../../charts/chart-circle";
import Card from "../../card"
import { projectEntity } from "@/types/types";

export default async function ProjectsCircleCard() {
  const projectsLive: projectEntity[] | null = await fetchProjectsLive();
  const projectsPending: projectEntity[] | null = await fetchProjectsPending();
  const allProjects: projectEntity[] | null = [...projectsLive ?? [], ...projectsPending ?? []];

  const numberProjectsLive = projectsLive ? projectsLive.length : 0;
  const numberProjectsPending = projectsPending ? projectsPending.length : 0;

  const values = [
    { value: numberProjectsLive, name: 'Public' },
    { value: numberProjectsPending, name: 'Private' }
  ]

  return(
    <Card>
      <div className="w-full h-full p-5 flex flex-col justify-start">
        <h3 className="text-xl w-full">Projects Type</h3>
        {
          allProjects && allProjects?.length > 0 ? (
            <ChartCircle values={values} />
          ) :
           (
            <div className="flex justify-center items-center h-[300px] w-[300px] 3xl:h-[450px] 3xl:w-[450px] m-auto">
              <p className="text-gray-400 text-center text-lg w-2/3">You dont have suficient projects to show a chart</p>
            </div>
          )
        }
      </div>
    </Card>
  )
}