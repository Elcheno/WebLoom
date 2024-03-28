import { Suspense } from "react";
import ProjectList from "../../ui/explore/projects/project-list";
import { SkeletonProjectListExplore } from "../../ui/projects/skeletons";
import SearchBarExplore from "../../ui/explore/search-bar-explore";

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
    <main className="col-start-1 lg:col-start-2 col-end-13 lg:col-end-12 flex flex-col">

      <section className="w-full px-4 lg:px-10 pt-10 pb-5 flex gap-2">
        <SearchBarExplore />
      </section>
      
      <section className="w-full h-full px-4 lg:px-10 grid grid-cols-12 grid-rows-1 gap-3">
        <div className="col-start-1 col-end-13">
          <Suspense fallback={<SkeletonProjectListExplore />}>
            <ProjectList query={query} currentPage={currentPage}/>
          </Suspense>
        </div>        
      </section>
    </main>
  )
}