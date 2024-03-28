import { fetchProfilesFilteredPagePublic } from "@/app/lib/data-public";
import { userEntity } from "@/types/types";
import Card from "../../card";


export default async function UserList({ query, currentPage }: { query: string, currentPage: number }) {
  const profiles: userEntity[] | null = await fetchProfilesFilteredPagePublic({ query, currentPage });

  return (
    <div className="lg:mx-24 xl:mx-44 2xl:mx-64 3xl:mx-96 grid grid-cols-1 gap-3">
      {
        profiles && profiles.length > 0 && (
          profiles?.map((profile: userEntity) => {
            return (
              <Card key={ profile.id } classList={`p-5 grid grid-cols-4 grid-rows-1 gap-8 hover:bg-white border border-gray-50 hover:shadow-sm transition-all duration-100 min-h-[225px] max-h-[500px]`}>
                
                <div className="col-start-1 col-end-1 h-full flex justify-center items-center">
                  <img src={ profile.avatar_url } alt="" className="w-24 h-24 rounded-full"/>
                </div>

                <div className="col-start-2 col-end-5 flex justify-between items-center">
                  <p className="hover:underline text-xl hover:cursor-pointer">@{ profile.user_name }</p>
                  <div className="flex flex-col justify-center items-center mr-5">
                    <span className="text-[4rem]">{ profile.projects_count?.map((count) => { return count.count }) }</span>
                    <span className="">Public projects</span>
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