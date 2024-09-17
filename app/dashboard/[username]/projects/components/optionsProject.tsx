"use client";

import { ConfirmationDialog } from "@/components/core"
import Link from "next/link"
import { 
  ArrowTopRightOnSquareIcon,
  EyeIcon,
  TrashIcon,
  EllipsisHorizontalIcon
 } from "@heroicons/react/16/solid"
import { 
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
 } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { removeProject } from "@/app/lib/actions/actions.project";

export default function OptionsProject({
  project
} : {
  project?: any // implementar el tipo project
}) {
  const [ deleteModal, setDeleteModal ] = useState(false)

  const deleleProject = async () => {
    const formData = new FormData();
    formData.append("id", project?.id);
    const response = await removeProject(undefined, formData);
  }

  return (
    <>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="cursor-pointer hover:bg-gray-200 p-[.2rem] rounded-md transition-colors">
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{project?.name ?? "Project"}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {
            project?.url && (
              <a href={ project?.url } className="flex items-center w-full" target="_blank" rel="noreferrer">
                <DropdownMenuItem>
                  <ArrowTopRightOnSquareIcon className="mr-2 h-4 w-4" />
                  Visit project
                </DropdownMenuItem>
              </a>
            )
          }
          <Link href={`${project?.simple_name}`} className="flex items-center w-full">
            <DropdownMenuItem className="w-full">
                <EyeIcon className="mr-2 h-4 w-4" />
                View project
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={ () => setDeleteModal(true)}>
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete project
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmationDialog 
        open={ deleteModal }
        setOpen={ setDeleteModal }
        title="Are you sure you want to delete this project?"
        description="If you delete this project, you will not be able to recover it."
        action={deleleProject}
      />
    </>
  )
}