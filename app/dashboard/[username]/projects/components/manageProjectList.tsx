import CardProject from "./cardProjects";
import { getMyProjectsFiltered } from "@/app/lib/data/data.projects";
import { Project } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { CreateProjectButton } from "@/components/custom";
import Link from "next/link";

export default async function ManageProjectList({
  page,
  visibility,
  query,
}: {
  page: number;
  visibility: string;
  query: string;
}) {
  const result: Project[] = await getMyProjectsFiltered({
    page,
    visibility,
    query,
  });

  return (
    <>
      <div
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(19rem, 1fr))" }}
        className="grid gap-6 justify-center items-center self-center"
      >
        {result.length === 0
          ? projectListEmpty()
          : result.map((project: Project) => {
              return (
                // <Link key={project.id} href={`${project.simple_name}`} legacyBehavior>
                // </Link>
                <CardProject project={project} />
              );
            })}
      </div>
    </>
  );
}

function projectListEmpty() {
  return (
    <Card className="w-full col-span-2 h-[40dvh]">
      <div className="w-full h-full flex justify-center items-center gap-4">
        <p className="text-lg text-black">
          Your project list is empty, try adding one.
        </p>
        <CreateProjectButton />
      </div>
    </Card>
  );
}
