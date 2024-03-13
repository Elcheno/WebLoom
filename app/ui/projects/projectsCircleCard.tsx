import { fetchProjectsLive, fetchProjectsPending } from "@/app/lib/data";
import ChartCircle from "../charts/chartCircle";
import Card from "../card"

export default async function ProjectsCircleCard() {
  const projectsLive = await fetchProjectsLive();
  const projectsPending = await fetchProjectsPending();

  const numberProjectsLive = projectsLive ? projectsLive.length : 0;
  const numberProjectsPending = projectsPending ? projectsPending.length : 0;

  const values = [
    { value: numberProjectsLive, name: 'Live' },
    { value: numberProjectsPending, name: 'Pending' }
  ]

  return(
    <Card>
      <div className="w-full h-full p-5 flex flex-col justify-start">
        <h3 className="text-xl w-full">Projects Type</h3>
        <ChartCircle values={values} />
      </div>
    </Card>
  )
}