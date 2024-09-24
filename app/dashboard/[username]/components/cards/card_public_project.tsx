import { getMyPublicProjects } from "@/app/lib/data/data.projects";
import { Card } from "@/components/ui/card";

export default async function CardPublicProject() {
  const public_projects = await getMyPublicProjects();

  return (
    <Card className="p-10 flex flex-col justify-center items-center gap-2">
      <span>Public projects</span>
      <span className="text-2xl font-bold">{public_projects.length}</span>
    </Card>
  );
}
