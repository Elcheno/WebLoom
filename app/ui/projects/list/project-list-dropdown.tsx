"use client";

import { changeVisibilityPublic, changeVisibilityPrivate, removeProject } from "@/app/lib/actions";
import { 
  AlertDialog, 
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle, } from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatName } from "@/utils/utils";
import { Lock, Trash2, Pencil } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function ProjectListDropdown({ project }: any) {
  const [visibility, setVisibility] = useState(false);
  const [deleteProject, setDeleteProject] = useState(false);
  const [urlProject, setUrlProject] = useState(false);

  const handleVisibility = async (project: any) => {
    if (project.visibility === "public") {
      const [data, error] = await changeVisibilityPrivate({ id: project.id });
      
      if (!error) {
        toast.success(`Project ${project.name} is now Private`);

      } else {
        toast.error(`Error change visibility project`);

      }
    } else {

      if (!project.url) {
        setVisibility(false);
        setUrlProject(true);
        return;
      }

      const [data, error] = await changeVisibilityPublic({ id: project.id });
      
      if (!error) {
        toast.success(`Project ${project.name} is now Public`);

      } else {
        toast.error(`Error change visibility project`);

      }
    }

    setVisibility(false);
  }

  const handleDelete = async (project: any) => {
    const [data, error] = await removeProject({ id: project.id });

    if (!error) {
      toast.success(`Project ${project.name} deleted successfully`);
    } else {
      toast.error(`Error deleting project ${project.name}`);
    }

    setDeleteProject(false);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer hover:text-[#b8d900] transition-colors hover:bg-gray-50 rounded-lg p-1 outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis">
            <circle cx="12" cy="12" r="1"/>
            <circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
          </svg>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          
          <DropdownMenuItem className="cursor-pointer text-base p-2" onClick={ () => setVisibility(true) }>
            <Lock className="w-4 h-4 mr-2" />
            Change Visibility
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer text-base p-2" onClick={ () => setDeleteProject(true) }>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Project
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer text-base p-2">   
            <Link href={ `/projects/${ formatName(project.name) }` } className="flex items-center">
              <Pencil className="w-4 h-4 mr-2" />
              Edit project
            </Link>
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={visibility}>
        <AlertDialogContent>
          <AlertDialogHeader>
              <AlertDialogTitle className="text-lg">Change Visibility to { project.visibility === "public" ? "Private" : "Public" }</AlertDialogTitle>
              <AlertDialogDescription className="text-base">
                This project is now 
                { project.visibility === "public" 
                  ? " Public, are you sure to change the visibility to Private?" 
                  : " Private, are you sure to change the visibility to Public?" 
                }
              </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
              <AlertDialogCancel onClick={ () => setVisibility(false) }>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={ () => handleVisibility(project) }>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deleteProject}>
        <AlertDialogContent>
          <AlertDialogHeader>
              <AlertDialogTitle className="text-lg">Delete Project</AlertDialogTitle>
              <AlertDialogDescription className="text-base">Are you sure?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
              <AlertDialogCancel onClick={ () => setDeleteProject(false) }>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={ () => handleDelete(project) }>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
    </>
  )
}