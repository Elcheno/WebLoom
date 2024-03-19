import AddProjectsButton from "../ui/projects/add-projects-button";
import ProjectsNavBar from "../ui/projects/projects-nav-bar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const supabase = createClient();
  const { data: { session }} = await supabase.auth.getSession();

  if (session === null) {
    redirect("/sign-in");
  }

  return (
    <main className="w-full h-full flex flex-col items-center">
      
      <section className="flex justify-between w-full px-10 h-14">
        <h1 className="text-4xl">Client Projects</h1>
        <AddProjectsButton />
      </section>

      <section className="w-full grid grid-cols-12 grid-rows-1">

        <nav className="col-start-1 col-end-2 h-full pt-10 pl-10">
          <ProjectsNavBar />
        </nav>

        { children }

      </section>
      

    </main>
  )
}