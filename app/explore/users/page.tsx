import SearchBarExplore from "@/app/ui/explore/search-bar-explore";
import UserList from "@/app/ui/explore/users/user-list";
import { SkeletonProjectListExplore } from "@/app/ui/projects/skeletons";
import { Suspense } from "react";


export default function Page({
  searchParams
}: {
  searchParams: {
    query?: string,
    page?: string
  }
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main className="col-start-2 col-end-12 flex flex-col">

      <section className="w-full px-10 pt-10 pb-5 flex gap-2">
        <SearchBarExplore />
      </section>
      
      <section className="w-full h-full px-10 grid grid-cols-12 grid-rows-1 gap-3">
        <div className="col-start-1 col-end-13">
          <Suspense fallback={<SkeletonProjectListExplore />}>
            <UserList query={query} currentPage={currentPage}/>
          </Suspense>
        </div>        
      </section>
    </main>
  )
}