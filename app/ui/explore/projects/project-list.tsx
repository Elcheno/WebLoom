import { fetchProjectsFilteredPagePublic } from "@/app/lib/data-public";
import { projectPublic } from "@/types/types";
import Card from "../../card";
import Link from "next/link";
import { formatDate, formatName } from "@/utils/utils";
import { ArrowUpRightFromSquare, Heart, Pin, Repeat2 } from "lucide-react";


export default async function ProjectList({ query, currentPage }: { query: string, currentPage: number }) {
  const projects: projectPublic[] | null = await fetchProjectsFilteredPagePublic({ query, currentPage });

  return (
    <div className="lg:mx-24 xl:mx-44 2xl:mx-64 3xl:mx-96 grid grid-cols-1 gap-3">
      {
        projects && projects.length > 0 && (
          projects?.map((project: projectPublic) => {
            return (
              <Card key={ project.id } classList={`p-5 flex gap-8 hover:bg-white border border-gray-50 hover:shadow-sm transition-all duration-100 min-h-[225px] max-h-[500px]`}>
                <div className="flex flex-col gap-2 w-fit justify-center items-center">
                  <img src={project.users.avatar_url} alt="" className="w-16 h-16 rounded-full "/>
                  <Link href={'/'} className="text-gray-600 hover:underline">@{ project.users.user_name }</Link>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <div className="flex flex-nowrap justify-between">
                    <a href={ `/projects/${ formatName(project.name) }` } className="text-xl hover:underline">{ project.name }</a>
                    <div className="flex gap-2">
                      {
                        project?.url && (
                          <a href={ project.url } target="_blank" rel="noreferrer" className="hover:text-[#b8d900] transition-colors hover:bg-gray-50 rounded-lg p-1"><ArrowUpRightFromSquare className="w-6 h-6"/></a>
                        )
                      }
                    </div>
                  </div>
                  <div className="px-10 h-full">
                    <p className="text-base mx-auto text-center text-pretty">{ project.description }</p>
                  </div>

                  <div className="flex self-end w-full justify-between">
                    <div className="flex gap-5">
                      <button><Heart className="w-6 h-6 text-gray-600"/></button>
                      <button><Repeat2 className="w-6 h-6 text-gray-600"/></button>
                      <button><Pin className="w-6 h-6 text-gray-600"/></button>
                    </div>
                    <div>
                      <span className="py-1 px-2 bg-gray-50 rounded-lg">{ formatDate(project.created_at) }</span>
                    </div>                    
                  </div>
                </div>               
              </Card>              
            )
          })
        )
      }
    </div>
  )

}