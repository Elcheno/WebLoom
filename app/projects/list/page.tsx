import FilterProjectList from "@/app/ui/projects/list/filter-project-list";
import ProjectList from "@/app/ui/projects/list/projectList";
import SearchBar from "@/app/ui/projects/list/search-bar";
import { SkeletonProjectList } from "@/app/ui/projects/skeletons";
import { Suspense } from "react";


export default function ProjectsList({ 
  searchParams
}: {
  searchParams: {
    query?: string,
    page?: string,
    state?: string
  }
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const state = searchParams?.state || 'all';

  return (
    <main className="col-start-2 col-end-12 flex flex-col">

      <section className="w-full px-10 pt-10 pb-5 flex gap-2">
        <SearchBar />
        <FilterProjectList />
      </section>

      <section className="w-full h-full px-10 grid grid-cols-12 grid-rows-1 gap-3">
        <div className="col-start-1 col-end-13">
          <Suspense fallback={<SkeletonProjectList />}>
            <ProjectList query={query} currentPage={currentPage} state={state}/>
          </Suspense>
        </div>
      </section>
    </main>

  )
}