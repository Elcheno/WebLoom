import { getMyPrivateProjects } from "@/app/lib/data/data.projects";
import { Card } from "@/components/ui/card";

export default async function CardPrivateProject() {
  const private_projects = await getMyPrivateProjects();

  return (
    <Card className="p-10 flex flex-col justify-center items-center gap-2">
      <span>Private projects</span>
      <span className="text-2xl font-bold">{private_projects.length}</span>
    </Card>
  );
}
