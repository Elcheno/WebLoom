import { fetchProjects, fetchProjectsLive, fetchProjectsPending } from "@/app/lib/data";
import Card from "../../card";
import ChartGradient from "../../charts/chart-gradient";
import * as echarts from 'echarts';
import { countCoincidences } from "@/app/lib/utils";
import { formatDate } from "@/utils/utils";
import { projectEntity } from "@/types/types";

export default async function ProjectsGradiantCard() {
  const projectsLive: projectEntity[] | null = await fetchProjectsLive();
  const projectsPending: projectEntity[] | null = await fetchProjectsPending();
  const allProjects: projectEntity[] | null = await fetchProjects();

  const numberProjects = allProjects ? allProjects.length : 0;

  let xAxis = new Set() as any;
  xAxis.add('');

  allProjects?.map((project: any) => {
    xAxis.add(formatDate(project?.created_at));
  });

  const xAxisOptions = [...xAxis];

  const publicValues = countCoincidences(projectsLive ?? [], xAxisOptions);
  const privateValues = countCoincidences(projectsPending ?? [], xAxisOptions);
  
  const values = [
    {
      name: 'Private',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#757F9A'
          },
          {
            offset: 1,
            color: '#D7DDE8'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: privateValues
    },
    {
      name: 'Public',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#EDE574'
          },
          {
            offset: 1,
            color: '#E1F5C4'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: publicValues
    }
  ]

  const valueString = JSON.stringify(values);

  return(
    <Card>
      <div className="w-full h-full p-5 flex flex-col justify-start">
        <h3 className="text-xl w-full">Projects in Time</h3>
        <div className="flex justify-between items-center h-full w-full">
          <div className="flex flex-col justify-center items-center text-center mx-auto">
            <span>Total projects</span>
            <span className="text-[4rem]">{ numberProjects }</span>
          </div>
          <div className="w-fit px-5">
            {
              allProjects && allProjects?.length > 2 ? (
                <ChartGradient values={valueString} />
              ) : (
                <div className="flex justify-center items-center h-[300px] w-[600px] 3xl:h-[450px] 3xl:w-[750px] m-auto">
                  <p className="text-gray-400 text-center text-lg w-2/3">You dont have suficient projects to show a chart</p>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </Card>
  )

}