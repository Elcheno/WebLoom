import { Suspense } from "react";
import ProjectList from "../ui/explore/project-list";
import { SkeletonProjectList } from "../ui/projects/skeletons";
import SearchBarExplore from "../ui/explore/search-bar-explore";

export default function Explore({
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
    <main className="w-full flex flex-col items-center mb-5">
      
      <section className="flex justify-start w-full pl-10">
        <h1 className="text-4xl">Explore</h1>
      </section>

      <section className="w-full px-10 pt-10 pb-5 flex gap-2">
        <SearchBarExplore />
      </section>
      
      <section className="w-full h-full px-10 grid grid-cols-12 grid-rows-1 gap-3">
        <div className="col-start-1 col-end-13">
          <Suspense fallback={<SkeletonProjectList />}>
            <ProjectList query={query} currentPage={currentPage}/>
          </Suspense>
        </div>        
      </section>
    </main>
  )
}