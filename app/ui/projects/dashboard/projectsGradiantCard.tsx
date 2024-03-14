import { fetchProjects, fetchProjectsLive, fetchProjectsPending } from "@/app/lib/data";
import Card from "../../card";
import ChartGradient from "../../charts/chartGradient";
import * as echarts from 'echarts';
import { countCoincidences } from "@/app/lib/utils";

export default async function ProjectsGradiantCard() {
  const projectsLive = await fetchProjectsLive();
  const projectsPending = await fetchProjectsPending();
  const allProjects = await fetchProjects();

  const numberProjects = allProjects ? allProjects.length : 0;

  let xAxis = new Set() as any;
  xAxis.add('');

  allProjects?.map((project: any) => {
    xAxis.add(project?.date)
  });

  const xAxisOptions = [...xAxis];

  const liveValues = countCoincidences(projectsLive ?? [], xAxisOptions);
  const pendingValues = countCoincidences(projectsPending ?? [], xAxisOptions);
  
  const values = [
    {
      name: 'Pending',
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
      data: pendingValues
    },
    {
      name: 'Live',
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
      data: liveValues
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
            <ChartGradient valueString={valueString} xAxisOptions={xAxisOptions}/>
          </div>
        </div>
      </div>
    </Card>
  )

}