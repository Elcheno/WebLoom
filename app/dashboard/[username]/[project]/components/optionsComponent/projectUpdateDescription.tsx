import { Project } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner"

export default function ProjectUpdateDescription({
  project,
  updateProject
} : {
  project: Project | null,
  updateProject: (formData: FormData) => Promise<"Error update project" | undefined>
}) {

  const [ description, setDescription ] = useState<string>(project?.description ?? '');

  const updateDescription = async () => {
    if (!project) return;

    const formData = new FormData();
    formData.append('id', project.id);
    formData.append('name', project.name);
    formData.append('description', description);
    formData.append('url', project.url || '');

    const result = await updateProject(formData);

    if (result === 'Error update project') {
      toast.error(`Error to update project`);
    } else {
      toast.success(`Project has been updated`);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit description</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit description</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              defaultValue={description}
              className="col-span-3"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>    
            <Button type="button" onClick={() => updateDescription()}>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}