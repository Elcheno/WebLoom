"use client";

import { useState } from "react";
import Card from "../../card";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { 
  AlertDialog, 
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle, } from "@/components/ui/alert-dialog"
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { changeVisibilityLive, changeVisibilityPending } from "@/app/lib/actions";

export default function PageViewProject({ project }: { project: any}) {
  const [ clipboard, setClipboard ] = useState<boolean>(false);

  const handlerCopyClipboard = () => {
    navigator.clipboard.writeText(project.url);
    toast.success('URL copied to clipboard');
    setClipboard(true);
    setTimeout(() => {
      setClipboard(false);
    }, 250);
  }

  const handlerChangeVisibility = async () => {
    if (project.state === "live") {
      const [data, error] = await changeVisibilityPending({ id: project.id });
      
      if (!error) {
        toast.success(`Project ${project.name} is now Private`);
      } else {
        toast.error(`Error deleting project ${project.name}`);
      }
    } else {
      const [data, error] = await changeVisibilityLive({ id: project.id });
      
      if (!error) {
        toast.success(`Project ${project.name} is now Public`);
      } else {
        toast.error(`Error deleting project ${project.name}`);
      }
    }
  }

  return (
    <>
      <Card>
        <div className="flex flex-col p-6 text-center gap-10">
          <h3 className="text-[2rem] my-auto">{ project.name }</h3>

          <div className="flex flex-col justify-between gap-16">
            <div className="text-pretty px-10">
              <h3 className="text-lg">{ project.description }</h3>
            </div>
            <div className="grid grid-cols-2 grid-rows-1 justify-between w-full self-end">
              <div className="flex flex-nowrap gap-2 items-center">
                {
                  project.url
                    ? (
                      <>
                        <a href={ project.url } target="_blank" rel="noreferrer" className="text-lg hover:underline">{ project.url }</a>
                        <Copy className={`w-5 h-5 cursor-pointer ${clipboard ? 'animate-scale-pulse' : ''}`} onClick={ () => handlerCopyClipboard() } />
                      </>
                    ) : (
                      <span className="text-lg">Try to add a URL</span>
                    )
                }
              </div>
              
              <div className="flex flex-nowrap justify-end">
                {
                  project.state === 'live' ? (
                    <span className="text-lg bg-gray-200 py-1 px-3 rounded-full text-black-primary">Public</span>
                  ) : (
                    <span className="text-lg bg-gray-200 py-1 px-3 rounded-full text-black-primary">Private</span>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-4 p-4">

          <section className="border-2 border-gray-50 grid grid-cols-4 grid-rows-1 gap-2 rounded-[2rem] p-4">
            <div className="col-start-1 col-end-4 flex flex-col gap-2">
              <div>
                <h3 className="text-lg">Visibility</h3>
              </div>
              <div className="pl-4">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, voluptatum qui. Ullam, temporibus sunt tempora ipsa saepe quidem aut reiciendis quam veniam illo unde, numquam fugiat animi tenetur, dolorum ex?</p>
              </div>
            </div>
            <div className="col-start-4 col-end-5 flex items-center justify-center">
              <AlertDialog>
                <AlertDialogTrigger>
                  <button className="bg-black-primary text-white-primary p-1 rounded-full border border-gray-50">
                    <div className="flex items-center justify-center px-2 py-1 border-2 border-black-primary hover:border-[#EDFD93] transition-colors rounded-full">
                      {
                        project.state === 'live' ? (
                          <span>Make to private</span>
                        ) : (
                          <span>Make to public</span>
                        )
                      }
                    </div>
                </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                      <AlertDialogTitle className="text-lg">Change Visibility to { project.state === "live" ? "Private" : "Public" }</AlertDialogTitle>
                      <AlertDialogDescription className="text-base">
                        This project is now 
                        { project.state === "live" 
                          ? "Public, are you sure to change the visibility to Private?" 
                          : "Private, are you sure to change the visibility to Public?" 
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
          </section>

          <section className="border-2 border-gray-50 grid grid-cols-4 grid-rows-1 gap-2 rounded-[2rem] p-4">
            <div className="col-start-1 col-end-4 flex flex-col gap-2">
              <div>
                <h3 className="text-lg">Visibility</h3>
              </div>
              <div className="pl-4">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, voluptatum qui. Ullam, temporibus sunt tempora ipsa saepe quidem aut reiciendis quam veniam illo unde, numquam fugiat animi tenetur, dolorum ex?</p>
              </div>
            </div>
            <div className="col-start-4 col-end-5 flex items-center justify-center">
              <button className="bg-black-primary text-white-primary p-1 rounded-full border border-gray-50">
                <div className="flex items-center justify-center px-2 py-1 border-2 border-black-primary hover:border-[#EDFD93] transition-colors rounded-full">
                  Make to public
                </div>
              </button>            
            </div>
          </section>

        </div>        
      </Card>
    </>
  )
}