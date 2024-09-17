import { getMyProjectBySimpleName } from "@/app/lib/data/data.projects"
import ProjectCard from "./components/projectCard";
import ProjectOptionsCard from "./components/projectOptionsCard";

export default async function Project({ params }: { params: { username: string, project: string } }) {
  const project = await getMyProjectBySimpleName(params.project);
  console.log(project);

  return (
      <main className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <section>
          <ProjectCard project={project} />
        </section>
        <section>
          <ProjectOptionsCard project={project} />
        </section>
      </main>
  )
}