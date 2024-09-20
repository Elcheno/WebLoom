import { getSession } from "@/app/lib/actions/actions.auth";

import {
  getMyPrivateProjects,
  getMyPublicProjects,
} from "@/app/lib/data/data.projects";

import {
  getProjectsHistory
} from "@/app/lib/data/data.project.history";

import { getUserByEmail } from "@/app/lib/data/data.users";

import { formatDateTime } from "@/app/utils/format";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Suspense } from "react";

import { RelativeTime } from "@/components/core";

export default async function Dashboard() {
  const session = await getSession();
  const session_user = session?.user;

  const user = await getUserByEmail(session_user?.email || "");
  const public_projects = await getMyPublicProjects();
  const private_projects = await getMyPrivateProjects();
  // console.log(public_projects, private_projects, user);

  const project_history = await getProjectsHistory();
  console.log(project_history);
  

  const data = {
    labels: public_projects.map((v) => new Date(v.created_at).toDateString()),
    datasets: [
      {
        label: "Public",
        data: public_projects.map((v, i) => i + 1),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
    ],
  }

  return (
    <>
      <div className="p-4 xl:p-0 flex flex-col gap-8">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Suspense fallback={"...Cargando"}>
            <Card className="p-10 flex justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold">#{user?.username}</span>
                <span className="text-xl">{user?.name}</span>
              </div>
              <div className="h-[60px] flex items-center">
                <Avatar className="h-full w-full">
                  <AvatarImage src={user?.avatar_url} alt={user?.username} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </Card>
          </Suspense>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <Suspense fallback={"...Cargando"}>
              <Card className="p-10 flex flex-col justify-center items-center gap-2">
                <span>Public projects</span>
                <span className="text-2xl font-bold">
                  {public_projects.length}
                </span>
              </Card>
            </Suspense>

            <Suspense fallback={"...Cargando"}>
              <Card className="p-10 flex flex-col justify-center items-center gap-2">
                <span>Private projects</span>
                <span className="text-2xl font-bold">
                  {private_projects.length}
                </span>
              </Card>
            </Suspense>
          </section>
        </section>

        <section className="grid grid-cols-1">
          <Card className="grid grid-cols-1 sm:grid-cols-2 justify-center items-center gap-10 p-5">
            <section className="">
              <Card></Card>
            </section>
            
            <section className="flex justify-center items-center">
              <Card className="p-5 flex flex-col gap-2 w-full">
                <h2 className="text-center pb-2">Project History</h2>
                {
                  project_history.length > 0
                    ? (
                      project_history.map(v => {
                        return (
                          <div className="border-b p-2">
                            <span>
                              {v.username} has {v.action} the project {v.project_name} at <RelativeTime date={v.created_at} />
                            </span>
                          </div>
                        )
                      })
                    ) : (
                      <div></div>
                    )
                }
              </Card>
            </section>
          </Card>
        </section>
      </div>
    </>
  );
}
