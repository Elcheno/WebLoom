import { fetchProjects } from "@/app/lib/data";

export default async function ShowNumberProjects() {
  const projects = await fetchProjects();

  const numberProjects = projects ? projects.length : 0;

  return (
    <div>
      <p>{ numberProjects }</p>
    </div>
  )
}