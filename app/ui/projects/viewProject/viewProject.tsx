import { formatVisibility, unFormatName } from "@/utils/utils";
import Card from "../../card";
import ChangeVisibility from "./ChangeVisibility";
import CopyClipboard from "./CopyClipboard";
import DeleteProject from "./DeleteProject";
import { fetchProjectByName } from '@/app/lib/data';
import UpdateName from "./UpdateName";
import UpdateDescription from "./UpdateDescription";
import UpdateUrl from "./UpdateUrl";
import { projectEntity } from "@/types/types";

export default async function PageViewProject({ params }: { params: any}) {  
  const project: projectEntity = (await fetchProjectByName({ name: unFormatName(params.name) }))?.[0];

  return (
    <>
      <Card>
        <div className="flex flex-col p-6 text-center gap-10">
          <h3 className="text-[2rem] my-auto">{ project?.name }</h3>

          <div className="flex flex-col justify-between gap-16">
            <div className="text-pretty px-10">
              <h3 className="text-lg">{ project?.description }</h3>
            </div>
            <div className="grid grid-cols-2 grid-rows-1 justify-between w-full self-end">

              <CopyClipboard project={ project }/>
              
              <div className="flex flex-nowrap justify-end">
                <span className="text-lg bg-gray-200 py-1 px-3 rounded-full text-black-primary">
                  { formatVisibility(project?.visibility) }
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-4 p-4">
          
          <UpdateName project={ project }/>
          <UpdateDescription project={ project }/>
          <UpdateUrl project={ project }/>
          <ChangeVisibility project={ project }/>
          <DeleteProject project={ project }/>

        </div>        
      </Card>
    </>
  )
}