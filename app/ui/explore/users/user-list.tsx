import { fetchProfilesFilteredPagePublic } from "@/app/lib/data-public";
import { userEntity } from "@/types/types";
import Card from "../../card";


export default async function UserList({ query, currentPage }: { query: string, currentPage: number }) {
  const profiles: userEntity[] | null = await fetchProfilesFilteredPagePublic({ query, currentPage });

  return (
    <div className="w-2/4 mx-auto grid grid-cols-1 gap-3">
      {
        profiles && profiles.length > 0 && (
          profiles?.map((profile: userEntity) => {
            return (
              <Card key={ profile.id } classList={`p-5 flex gap-8 hover:bg-white border border-gray-50 hover:shadow-sm transition-all duration-100 min-h-[225px] max-h-[500px]`}>
                <img src={ profile.avatar_url } alt="" className="w-24 h-24 rounded-full"/>
                <p>@{ profile.user_name }</p>
                <span>Public Projects: { profile.projects_count?.map((count) => { return count.count }) }</span>
              </Card>  
            )
          })
        )
      }
    </div>
  )
}