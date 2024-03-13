import { fetchProjectsFilteredPage } from "@/app/lib/data"
import { ArrowUpRightFromSquare } from "lucide-react";
import Card from "../../card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Lock, Trash2 } from "lucide-react";

export default async function ProjectList({
  query,
  currentPage,
  state
}: {
  query: string;
  currentPage: number;
  state: string;
}) {
  const projects = await fetchProjectsFilteredPage({ query, currentPage, state });

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-3">
      {
        projects?.map((project: any) => {
          return (
            <Card key={ project.id } classList={`p-5 flex flex-col hover:bg-white border border-gray-50 hover:shadow-sm transition-all duration-100`}>
              <div className="flex justify-between">
                <span className="text-xl">{ project.name }</span>
                <div className="flex gap-4">

                  <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer hover:text-[#b8d900] transition-colors hover:bg-gray-50 rounded-lg p-1 outline-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis">
                        <circle cx="12" cy="12" r="1"/>
                        <circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
                      </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className="cursor-pointer p-2 text-base">
                        <Lock className="w-4 h-4 mr-2" />
                        Change Visibility
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer p-2 text-base">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <span className="cursor-pointer hover:text-[#b8d900] transition-colors hover:bg-gray-50 rounded-lg p-1">
                    <a 
                      href={ project.url }
                      target="_blank" 
                      rel="noreferrer"
                      >
                        <ArrowUpRightFromSquare className="w-6 h-6"/>
                    </a>
                  </span>
                </div>
              </div>
              <div className="py-4 px-14 h-full">
                <span className="text-pretty mx-auto text-gray-600">{ project.description }</span>
              </div>
              <div className="flex justify-between px-4">
                <HoverCard>
                  <HoverCardTrigger>                
                    <span 
                      className={`${project.state === 'live' ? 'text-[#b8d900]' : 'text-[#757F9A]'} font-bold py-1 px-2 bg-gray-50 rounded-lg select-none cursor-default`}>
                      { project.state === 'live' ? 'Public' : 'Private' }
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <span>
                      This project is { project.state === 'live' ? 'public and can be seen by everyone in ' : 'private, if you want to make it public you need to change the visibility' } 
                      <span className="text-gray-600 hover:underline hover:cursor-pointer">
                        { project.state === 'live' ? `${ project.url }` : '' }
                      </span>
                    </span>
                  </HoverCardContent>
                </HoverCard>

                <span className="py-1 px-2 bg-gray-50 rounded-lg">{ new Date(project.date).toISOString().split('T')[0] }</span>
              </div>
            </Card>
          )
        })
      }
    </div>
  )
}