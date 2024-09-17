import { Project } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage 
} from "@/components/ui/avatar"
import {
  formatUrl,
  formatDate,
  formatFavicon
} from "@/app/utils/format"
import { Badge } from "@/components/ui/badge"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid"
import Link from "next/link"

export default function ProjectCard({
  project
} : {
  project: Project | null
}) {
  return (
    <Card className="md:sticky md:top-20 ">
      <CardHeader className="!flex flex-row justify-between">
      <section className="!flex flex-row gap-2 items-center">
        <div>
          <Avatar className="select-none">
            <AvatarImage src={ formatFavicon(project?.url ?? '') } />
            <AvatarFallback>{ project?.name[0] }</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <CardTitle className="text-nowrap text-ellipsis overflow-hidden text-lg">{ project?.name }</CardTitle>
          <CardDescription>
            {
              project?.url
                ? (
                  <a
                    className="cursor-pointer hover:text-blue-400 text-nowrap text-ellipsis overflow-hidden"
                    href={project?.url}>
                    { formatUrl(project?.url ?? '') }
                  </a>
                ) : (
                  <span>‎</span>
                )
            }
          </CardDescription>
        </div>
      </section>

      {
        project && (
          <section className="flex gap-2">
          {
            project.url && (
              <Link href={project.url} target="_blank" rel="noreferrer">
                <div 
                  className="flex items-center justify-center hover:bg-gray-200 p-[.4rem] rounded-md transition-colors">
                  <ArrowTopRightOnSquareIcon className="w-5 h-5"/>
                </div>
              </Link>
            )
          }
        </section>
        )
      }

      </CardHeader>

      <CardContent>
        <CardDescription className="text-nowrap text-ellipsis overflow-hidden">
          { project?.description }
        </CardDescription>
      </CardContent>

      <CardFooter className="justify-between">
        {
          project?.visibility &&
          <div><Badge variant="secondary">{ project?.visibility }</Badge></div>
        }
        {
          project?.created_at && 
          <div><Badge variant="secondary" className="font-normal">{ formatDate(project?.created_at) }</Badge></div>
        }
      </CardFooter>
    </Card>
  )
}
