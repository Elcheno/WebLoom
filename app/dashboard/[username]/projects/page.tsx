import { Suspense } from "react";
import { SearchBar, ManageProjectList } from "./components";
import { SkeletonProjectList } from "@/components/skeletons";
import { Card } from "@/components/ui/card";
import { CreateProjectButton } from "@/components/custom";

export default function Projects({
  searchParams,
}: {
  searchParams: {
    page?: string;
    visibility?: string;
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const visibility = searchParams?.visibility || "all";

  return (
    <>
      <main className="flex flex-col gap-10">
        <SearchBar />

        <section className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-y-0 md:gap-x-10">
          <div className="col-span-2">
            <h1 className="font-semibold mb-1">
              {visibility.charAt(0).toUpperCase() + visibility.slice(1)}{" "}
              projects
            </h1>
            <Suspense fallback={<SkeletonProjectList />}>
              <ManageProjectList
                page={currentPage}
                visibility={visibility}
                query={query}
              />
            </Suspense>
          </div>

          <div>
            <h1 className="font-semibold mb-1">Last publications</h1>
            <LastPublications />
          </div>
        </section>
      </main>
    </>
  );
}

function LastPublications() {
  return (
    <Card className="w-full col-span-2 h-[40dvh]">
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-lg text-black text-center">
          Why don't you try making a publication?
        </p>
        <CreateProjectButton />
      </div>
    </Card>
  );
}
