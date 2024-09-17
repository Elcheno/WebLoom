
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
  formatDate,
  formatFavicon
} from "@/app/utils/format"
import { Badge } from "@/components/ui/badge"
import OptionsProject from "./optionsProject";
import { Project } from "@/lib/types";
import { LinkProject } from "./";

export default function CardProject({
  project
} : {
  project?: Project
}) {
  
  return (
    <Card className="max-w-[28rem] min-w-[19rem] w-full h-full cursor-pointer">
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
                    <LinkProject url={project?.url}/>
                  ) : (
                    <span>‎</span>
                  )
              }
            </CardDescription>
          </div>
        </section>

        <section>
          <OptionsProject project={project}/>
        </section>
        
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
