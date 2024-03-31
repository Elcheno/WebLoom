import { fetchProjectsFilteredPagePublic } from "@/app/lib/data-public";
import { projectPublic } from "@/types/types";
import Card from "../../card";
import Link from "next/link";
import { formatDate, formatName } from "@/utils/utils";
import { ArrowUpRightFromSquare, Heart, Pin, Repeat2 } from "lucide-react";
import ButtonLike from "./button-like";


export default async function ProjectList({ query, currentPage }: { query: string, currentPage: number }) {
  const projects: projectPublic[] | null = await fetchProjectsFilteredPagePublic({ query, currentPage });

  return (
    <div className="lg:mx-24 xl:mx-44 2xl:mx-64 3xl:mx-96 grid grid-cols-1 gap-3">
      {
        projects && projects.length > 0 && (
          projects?.map((project: projectPublic) => {
            return (
              <Card key={ project.id } classList={`p-5 grid grid-cols-4 grid-rows-3 hover:bg-white border border-gray-50 hover:shadow-sm transition-all duration-100 min-h-[225px] max-h-[500px]`}>
                
                <div className="col-start-1 col-end-1 row-start-1 row-end-3 lg:row-end-4 flex flex-col gap-2 w-full h-full justify-center items-center">
                  <img src={project.users.avatar_url} alt="" className="w-12 h-12 lg:w-16 lg:h-16 rounded-full "/>
                  <Link href={'/'} className="text-gray-600 hover:underline">@{ project.users.user_name }</Link>
                </div>
                
                <div className="col-start-2 col-end-5 row-start-1 row-end-3 flex flex-col w-full gap-2">
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
                
                </div>  

                <div className="col-start-1 lg:col-start-2 col-end-5 row-start-3 row-end-4 flex self-end w-full justify-between">
                    
                  <div className="flex gap-6">
                    
                    <ButtonLike like={ { id: project.like?.[0]?.id ?? '', project_id: project.id, state: project.like.length > 0 ? true : false, numberLikes: project.likes_count[0].count } }/>

                    <div className="flex gap-1">
                      <button><Repeat2 className="w-6 h-6 text-gray-600"/></button>
                      <span className="text-gray-600">12k</span>
                    </div>
                   
                    <div className="flex gap-1">
                      <button><Pin className="w-6 h-6 text-gray-600"/></button>
                      <span className="text-gray-600">12k</span>
                    </div>

                  </div>
                  
                  <div>
                    <span className="py-1 px-2 bg-gray-50 rounded-lg">{ formatDate(project.created_at) }</span>
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