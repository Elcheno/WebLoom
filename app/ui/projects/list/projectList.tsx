import { fetchProjectsFilteredPage } from "@/app/lib/data"
import { ArrowUpRightFromSquare } from "lucide-react";
import Card from "../../card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import ProjectListDropdown from "./project-list-dropdown";
import Link from "next/link";
import { formatDate, formatName } from "@/utils/utils";
import { projectEntity } from "@/types/types";

export default async function ProjectList({
  query,
  currentPage,
  visibility
}: {
  query: string;
  currentPage: number;
  visibility: string;
}) {
  const projects: projectEntity[] | null = await fetchProjectsFilteredPage({ query, currentPage, visibility });

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-3">
      {
        projects && projects.length > 0 ? (
          projects?.map((project: projectEntity) => {
            return (
              <Card key={ project.id } classList={`p-5 flex flex-col hover:bg-white border border-gray-50 hover:shadow-sm transition-all duration-100 min-h-[225px] max-h-[500px]`}>
                <div className="flex justify-between">
                  <Link href={ `/projects/${ formatName(project.name) }` } className="text-xl hover:underline">{ project.name }</Link>
                  <div className="flex gap-4">
  
                    <ProjectListDropdown project={ project }/>
  
                  {
                    project?.url
                      && (
                        <span className="cursor-pointer hover:text-[#b8d900] transition-colors hover:bg-gray-50 rounded-lg p-1">
                          <a 
                            href={ project.url }
                            target="_blank" 
                            rel="noreferrer"
                            >
                              <ArrowUpRightFromSquare className="w-6 h-6"/>
                          </a>
                      </span>
                      )   
                  }
                  </div>
                </div>
                <div className="py-4 px-14 h-full">
                  <span className="text-pretty mx-auto text-gray-600">{ project.description }</span>
                </div>
                <div className="flex justify-between px-4">
                  <HoverCard>
                    <HoverCardTrigger>                
                      <span 
                        className={`${project.visibility === 'public' ? 'text-[#b8d900]' : 'text-[#757F9A]'} font-bold py-1 px-2 bg-gray-50 rounded-lg select-none cursor-default`}>
                        { project.visibility === 'public' ? 'Public' : 'Private' }
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <span>
                        This project is { project.visibility === 'public' ? 'public and can be seen by everyone in ' : 'private, if you want to make it public you need to change the visibility' } 
                        <span 
                          className="text-gray-600 hover:underline hover:cursor-pointer">
                          { project.visibility === 'public' ? `${ project.url }` : '' }
                        </span>
                      </span>
                    </HoverCardContent>
                  </HoverCard>
  
                  <span className="py-1 px-2 bg-gray-50 rounded-lg">{ formatDate(project.created_at) }</span>
                </div>
              </Card>
            )
          })
        ) : (
          <div className={`col-start-1 col-end-3 p-5 flex flex-col text-center`}>
            <p className="text-xl mt-4">No projects found</p>
          </div>
        )
      }
    </div>
  )
}