import ProjectsNavLinks from "./projects-nav-links";

export default function ProjectsNavBar() {
  return (
    <div className="w-full h-3/6 flex flex-col justify-start align-top sticky top-0 gap-2">
      <ProjectsNavLinks />
    </div>
  )
}