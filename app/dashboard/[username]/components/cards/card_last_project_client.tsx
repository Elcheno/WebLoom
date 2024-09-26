"use client";

import { Project } from "@/app/lib/entity";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatFavicon } from "@/app/utils/format";
import { RelativeTime } from "@/components/core";
import { Card } from "@/components/ui/card";
import { ArrowTopRightOnSquareIcon, EyeIcon } from "@heroicons/react/16/solid";
import { CreateProjectButton } from "@/components/custom";

import { navigate } from "@/app/lib/actions/actions.route";
import "./../../styles/style.css";

export default function CardLastProjectClient({
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
        {data ? (
          <>
            <div className="grid grid-cols-2 justify-between p-5">
              <div className="flex gap-2 justify-start items-center">
                <Avatar className="select-none">
                  <AvatarImage src={formatFavicon(data?.url ?? "")} />
                  <AvatarFallback>
                    {data?.name ? data.name[0] : ""}
                  </AvatarFallback>
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
          </>
        ) : (
          <>
            <div className="w-full h-full text-gray-400 flex flex-col items-center gap-2 my-24">
              <div className="w-fit flex gap-3 bg-white p-2 rounded-lg justify-center items-center">
                <span>You don't have any project</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                  />
                </svg>
              </div>
              <div>
                <CreateProjectButton />
              </div>
            </div>
          </>
        )}
      </div>

      {data ? (
        <>
          <div className="h-full max-h-20 bg-[#f7ff9e] rounded-t-lg transition-all ease-in-out duration-300 p-5 container_child">
            <div className="h-full w-full grid content-between">
              <div className="w-full">
                {hoverState ? data?.description : ""}
              </div>
              <div className="grid grid-cols-2 items-center justify-between h-min">
                <div>
                  <Badge>
                    <span>{data?.project_visibility}</span>
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
        </>
      ) : (
        <></>
      )}
    </Card>
  );
}
