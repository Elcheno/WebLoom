"use client";

import { Card } from "@/components/ui/card";
import { Project } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatFavicon } from "@/app/utils/format";
import { RelativeTime } from "@/components/core";

import { useDebouncedCallback } from "use-debounce";

import "./../styles/style.css";
import { useState } from "react";

export default function LastProject({ data }: { data: Project | null }) {
  const [hoverState, setHoverState] = useState<boolean>(false);

  const handlerChangeHover = useDebouncedCallback((value: boolean) => {
    setHoverState(value);
  }, 100);

  return (
    <Card
      className="flex flex-col gap-2 w-full h-full p-0 justify-between container"
      onMouseEnter={() => handlerChangeHover(true)}
      onMouseLeave={() => handlerChangeHover(false)}
    >
      <div className="flex gap-2 justify-start items-center p-5">
        <Avatar className="select-none">
          <AvatarImage src={formatFavicon(data?.url ?? "")} />
          <AvatarFallback>{data?.name ? data.name[0] : ""}</AvatarFallback>
        </Avatar>
        <span className="text-2xl font-bold">{data?.name}</span>
      </div>

      <div className="h-full max-h-20 bg-[#f7ff9e] rounded-t-lg transition-all ease-in-out duration-300 p-5 container_child">
        <div className="h-full w-full grid content-between">
          <div className="w-full">{hoverState ? data?.description : ""}</div>
          <div className="grid grid-cols-2 items-center justify-between h-min">
            <div>
              <Badge>
                <span>{data?.visibility}</span>
              </Badge>
            </div>
            <div className="flex justify-end items-end">
              <span>
                <Badge>
                  <RelativeTime date={new Date(data?.created_at || "")} />
                </Badge>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
