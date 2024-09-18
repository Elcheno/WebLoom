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
import { useState } from "react";
import { toast } from "sonner"
import { Input } from "@/components/ui/input";

export default function ProjectUpdateUrl({
  project,
  updateProject
} : {
  project: Project | null,
  updateProject: (formData: FormData) => Promise<"Error update project" | undefined>
}) {
  const [ url, setUrl ] = useState<string>(project?.url ?? '');

  const update = async () => {
    if (!project) return;

    const formData = new FormData();
    formData.append('id', project?.id);
    formData.append('name', project?.name);
    formData.append('description', project?.description);
    formData.append('url', url);

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
        <Button>Edit url</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit url</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
              Name
            </Label>
            <Input
              id="url"
              defaultValue={url}
              className="col-span-3"
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>    
            <Button type="button" onClick={() => update()}>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}