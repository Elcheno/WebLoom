"use client";

import { useState } from "react";
import Card from "../../card";
import { ArrowUpRightFromSquare } from "lucide-react";
import { formatDate, formatVisibility } from "@/utils/utils";

export default function LastProjectClientCard({ lastProject }: { 
  lastProject: { 
    name: string, 
    url: string, 
    visibility: string, 
    created_at: string, 
    description: string
  } 
}) {

  const [state, setState] = useState<boolean>(false);

  return (
    <Card>
      <div className="flex flex-col gap-2 justify-between img-card-backdrop rounded-[2rem] h-full w-full"
        onPointerEnter={ () => setState(true) } onPointerLeave={ () => setState(false) }
        >
        <section className="row-start-1 row-end-6 flex justify-between p-5 items-start">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl">Last Project</h3>
            <h3 className="text-2xl pl-2">{ lastProject.name }</h3>
          </div>
          <a 
            href={ lastProject.url } 
            target="_blank" rel="noreferrer" 
            className="hover:bg-white-primary rounded-xl flex items-center p-1 hover:bg-opacity-40 hover:backdrop-blur-[100px] transition-all">
            <ArrowUpRightFromSquare />
          </a>
        </section>

        <section className="flex flex-col justify-between bg-white-primary backdrop-blur-[2.5px] bg-opacity-30 rounded-[2rem] p-5 h-1/6 transition-all duration-300 w-full backdrop-layout-card">
          <div className="flex flex-row justify-between">
            <div><p className="text-lg">{ formatVisibility(lastProject.visibility) }</p></div>
            <div><p className="text-lg">{ formatDate(lastProject.created_at) }</p></div>
          </div>
          
          {
            state
              ? (
                <div className="h-full flex justify-center items-center text-center text-balance animate-zoom-in-fast mx-auto">
                  <p className="text-lg">{ lastProject.description }</p>
                </div>
              ) : (
                <></>
              )
          }
        </section>
      </div>
    </Card>
  )
}