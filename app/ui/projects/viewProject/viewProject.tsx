"use client";

import Card from "../../card";
import ChangeVisibility from "./ChangeVisibility";
import CopyClipboard from "./CopyClipboard";
import DeleteProject from "./DeleteProject";

export default function PageViewProject({ project }: { project: any}) {
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
                {
                  project?.state === 'live' ? (
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

          <ChangeVisibility project={ project }/>
          <DeleteProject project={ project }/>

        </div>        
      </Card>
    </>
  )
}