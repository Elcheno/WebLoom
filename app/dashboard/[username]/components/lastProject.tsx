"use client";

import { Card } from "@/components/ui/card";
import { Project } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatFavicon } from "@/app/utils/format";
import { RelativeTime } from "@/components/core";

import { navigate } from "@/app/lib/actions/actions.route";

import { useDebouncedCallback } from "use-debounce";

import "./../styles/style.css";
import { useState } from "react";

import { ArrowTopRightOnSquareIcon, EyeIcon } from "@heroicons/react/16/solid";

export default function LastProject({
  data,
  session_user,
}: {
  data: Project | null;
  session_user: any | null;
}) {
  const [hoverState, setHoverState] = useState<boolean>(false);

  const handlerChangeHover = useDebouncedCallback((value: boolean) => {
    setHoverState(value);
  }, 100);

  return (
    <Card
      className="flex flex-col gap-2 w-full h-full p-0 justify-between container min-h-[25rem]"
      onMouseEnter={() => handlerChangeHover(true)}
      onMouseLeave={() => handlerChangeHover(false)}
    >
      <div className="flex flex-col">
        <div className="pb-2 w-full bg-white p-5">
          <div className="w-full text-center border-b pb-2">Last Project</div>
        </div>
        <div className="grid grid-cols-2 justify-between p-5">
          <div className="flex gap-2 justify-start items-center">
            <Avatar className="select-none">
              <AvatarImage src={formatFavicon(data?.url ?? "")} />
              <AvatarFallback>{data?.name ? data.name[0] : ""}</AvatarFallback>
            </Avatar>
            <span className="text-2xl font-bold">{data?.name}</span>
          </div>

          <div className="flex justify-end items-end gap-3 flex-col lg:flex-row">
            <div
              onClick={() =>
                navigate(
                  `/dashboard/${session_user.simple_name}/${data?.simple_name}`,
                )
              }
              className="flex gap-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors hover:cursor-pointer"
            >
              <EyeIcon className="w-6 h-6" />
              <span>View</span>
            </div>
            {data?.url ? (
              <a
                href={data.url}
                target="_blank"
                rel="noreferrer"
                className="flex gap-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors hover:cursor-pointer"
              >
                <ArrowTopRightOnSquareIcon className="w-6 h-6" />
                <span>Visit</span>
              </a>
            ) : (
              <></>
            )}
          </div>
        </div>
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
