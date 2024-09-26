"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { formatDate, formatFavicon, formatDateTime } from "@/app/utils/format";
import { RelativeTime } from "@/components/core";
import { Project_History } from "@/app/lib/entity";
import { CursorArrowRaysIcon } from "@heroicons/react/16/solid";

export default function CardProjectHistoryClient({
  data,
}: {
  data: Project_History[];
}) {
  return (
    <Card className="p-5 flex flex-col gap-2 w-full min-h-[25rem]">
      <h2 className="text-center pb-2 border-b">Project History</h2>
      {data.length > 0 ? (
        data.map((v, i) => {
          return (
            <HoverCard key={i}>
              <HoverCardTrigger>
                <div className="border-b p-2 hover:bg-gray-100 rounded-t-md">
                  <span className="flex justify-start items-center gap-2">
                    <Card className="flex gap-2 p-2 justify-center items-center">
                      <Avatar className="select-none h-8 w-8">
                        <AvatarImage
                          src={formatFavicon(v.user?.avatar_url ?? "")}
                        />
                        <AvatarFallback>
                          {v.user?.username ? v.user.username[0] : ""}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-gray-400"> - </span>
                      <Avatar className="select-none h-8 w-8">
                        <AvatarImage
                          src={formatFavicon(v.project?.url ?? "")}
                        />
                        <AvatarFallback>
                          {v.project?.name ? v.project.name[0] : ""}
                        </AvatarFallback>
                      </Avatar>
                    </Card>
                    <span>
                      {v.user?.username || ""} has {v.action} the project{" "}
                      {v.project?.name || ""} at{" "}
                      <RelativeTime date={new Date(v.created_at || "")} />
                    </span>
                  </span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex flex-col gap-8">
                  <div className="grid grid-cols-2 justify-between gap-4">
                    <div className="flex flex-row gap-1 justify-center items-center">
                      <Avatar className="select-none">
                        <AvatarImage
                          src={formatFavicon(v.project?.url ?? "")}
                        />
                        <AvatarFallback>
                          {v.project?.name ? v.project.name[0] : ""}
                        </AvatarFallback>
                      </Avatar>
                      <p>{v.project?.name}</p>
                    </div>
                    <div className="flex justify-center items-center">
                      <span>{v.action.toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 justify-between">
                    <div className="flex justify-center items-center">
                      <span>{formatDate(v.created_at)}</span>
                    </div>
                    <div className="flex justify-center items-center">
                      <span>{formatDateTime(v.created_at)}</span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          );
        })
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 my-24">
          <div>
            <span className="text-gray-400">You don't have any action</span>
          </div>
          <CursorArrowRaysIcon className="text-gray-400 w-10" />
        </div>
      )}
    </Card>
  );
}
