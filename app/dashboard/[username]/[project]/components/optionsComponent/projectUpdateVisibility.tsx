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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ProjectUpdateVisibility({
  project,
  updateProject
} : {
  project: Project | null,
  updateProject: (formData: FormData) => Promise<"Error update project" | undefined>
}) {
  const [ visibility, setVisibility ] = useState<string>(project?.visibility ?? '');

  const update = async () => {
    if (!project) return;    

    const formData = new FormData();
    formData.append('id', project.id);
    formData.append('actual_visibility', project.visibility);
    formData.append('visibility', visibility);

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
        <Button>Edit visibility</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit visibility</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Visibility
            </Label>
            <Select value={visibility} onValueChange={(value) => setVisibility(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="public">Public</SelectItem>
              </SelectContent>
            </Select>
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