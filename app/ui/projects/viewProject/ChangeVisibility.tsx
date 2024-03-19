"use client";

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
import { changeVisibilityPublic, changeVisibilityPrivate } from "@/app/lib/actions";
import { toast } from "sonner";
import { Lock, Unlock } from "lucide-react";
import { useState } from "react";

export default function ChangeVisibility({ project }: { project: any}) {
  const [urlProject, setUrlProject] = useState(false);

  const handlerChangeVisibility = async () => {
    if (project?.visibility === "public") {
      const [data, error] = await changeVisibilityPrivate({ id: project?.id });
      
      if (!error) {
        toast.success(`Project ${project?.name} is now Private`);

      } else {
        toast.error(`Error change visibility`);

      }
    } else {

      if (!project.url) {
        setUrlProject(true);
        return;
      }

      const [data, error] = await changeVisibilityPublic({ id: project?.id });
      
      if (!error) {
        toast.success(`Project ${project?.name} is now Public`);
      } else {
        toast.error(`Error change visibility`);
      }
    }
  }


  return(
    <section className="border-2 border-gray-50 grid grid-cols-4 grid-rows-1 gap-2 rounded-[2rem] p-4">
      <div className="col-start-1 col-end-4 flex flex-col gap-2">
        <div>
          <h3 className="text-lg">Visibility</h3>
        </div>
        <div className="pl-4">
          <p>
            Project visibility is a user option that allows you to choose between keeping your project public so that everyone can view it on your profile 
            and keeping your project private so that only you can view it.
          </p>
        </div>
      </div>
      <div className="col-start-4 col-end-5 flex items-center justify-center">
        <AlertDialog>
          <AlertDialogTrigger>
            <button className="bg-black-primary text-white-primary p-1 rounded-full border border-gray-50">
              <div className="flex gap-1 items-center justify-center px-2 py-1 border-2 border-black-primary hover:border-[#EDFD93] transition-colors rounded-full">
                {
                  project?.visibility === 'public' ? (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      <span>Make to private</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4 mr-2" />
                      <span>Make to public</span>
                    </>
                  )
                }
              </div>
          </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle className="text-lg">Change Visibility to { project?.visibility === "public" ? "Private" : "Public" }</AlertDialogTitle>
                <AlertDialogDescription className="text-base">
                  This project is now 
                  { project?.visibility === "public" 
                    ? " Public, are you sure to change the visibility to Private?" 
                    : " Private, are you sure to change the visibility to Public?" 
                  }
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={ () => handlerChangeVisibility() }>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <AlertDialog open={urlProject}>
        <AlertDialogContent>
          <AlertDialogHeader>
              <AlertDialogTitle className="text-lg">Add URL</AlertDialogTitle>
              <AlertDialogDescription className="text-base">You need add a URL to your project if you want make it public</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
              <AlertDialogAction onClick={ () => setUrlProject(false) }>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}