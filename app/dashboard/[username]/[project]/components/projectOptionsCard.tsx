"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/lib/types";
import ProjectOption from "./projectOption";
import { updateProject as updateProjectAction } from "@/app/lib/actions/actions.project";
import { 
  ProjectUpdateDescription,
  ProjectUpdateName
} from "./optionsComponent";
import { Button } from "@/components/ui/button"


export default function ProjectOptionsCard({
  project
} : {
  project: Project | null
}) {
  const updateProject = async (formData: FormData) => {
    if (!project) return;
    return await updateProjectAction(undefined, formData);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-nowrap text-ellipsis overflow-hidden text-lg">{ project?.name } actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ProjectOption title="Change name" description="Change project name description">
          <ProjectUpdateName
            project={project}
            updateProject={updateProject}
          />
        </ProjectOption>

        <ProjectOption title="Change description" description="Change project description description">
          <ProjectUpdateDescription
            project={project}
            updateProject={updateProject}
          />
        </ProjectOption>

        <ProjectOption title="Change visibility" description="Change project visibility description">
          <Button className="w-min">
            Change visibility 
          </Button>
        </ProjectOption>

        <ProjectOption title="Change url" description="Change project url description">
          <Button className="w-min">
            Change url 
          </Button>
        </ProjectOption>
      </CardContent>
    </Card>
  )
}