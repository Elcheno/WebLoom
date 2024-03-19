"use client";

import { updateUrlProject } from "@/app/lib/actions";
import { 
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle, } from "@/components/ui/alert-dialog";
import { projectEntity } from "@/types/types";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function UpdateUrl({ project }: { project: projectEntity }) {
  const [url, setUrl] = useState(project?.url);

  const handlerSubmit = async () => {
    const [data, error] = await updateUrlProject({ id: project.id, url: url?.trim() ?? null });

    if (!error) {
      toast.success(`Project updated successfully`);
      
    } else {
      toast.error(`Error updating project`);

    }
  }

  return (
    <section className="border-2 border-gray-50 grid grid-cols-4 grid-rows-1 gap-2 rounded-[2rem] p-4">
      <div className="col-start-1 col-end-4 flex flex-col gap-2">
        <div>
          <h3 className="text-lg">Edit url project</h3>
        </div>
        <div className="pl-4">
          <p>
            When you delete your project, it will disappear completely along with all its records in your profile. You lose all trace of its existence, 
            no one will be able to visit it and you will be able to add it again later from scratch.
          </p>
        </div>
      </div>
      <div className="col-start-4 col-end-5 flex items-center justify-center">
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="bg-black-primary text-white-primary p-1 rounded-full border border-gray-50">
              <div className="flex gap-1 items-center justify-center px-2 py-1 border-2 border-black-primary hover:border-[#EDFD93] transition-colors rounded-full">
                <Pencil className="w-4 h-4 mr-2" />
                Edit url
              </div>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle className="text-lg">Edit url</AlertDialogTitle>
                <AlertDialogDescription className="text-base">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="pl-1">Url</label>
                    <input 
                      type="text" 
                      className="border border-gray-200 py-2 px-4 bg-gray-50 rounded-full text-black-primary"
                      defaultValue={ url ?? '' }
                      onChange={ (e) => setUrl(e.target.value) }
                    />
                  </div>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={ () => handlerSubmit() }>Save</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  )
}