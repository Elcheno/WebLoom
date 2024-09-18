
import { getSession } from "@/app/lib/actions/actions.auth";
import { getMyPrivateProjects, getMyPublicProjects } from "@/app/lib/data/data.projects";
import { getUserByEmail } from "@/app/lib/data/data.users";

import { ChartPie } from "./components";

import { Card } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { Suspense } from "react";

export default async function Dashboard() {

  const session = await getSession();
  const session_user = session?.user;

  const user = await getUserByEmail(session_user?.email || '');
  const public_projects = await getMyPublicProjects();
  const private_projects = await getMyPrivateProjects();
  console.log(public_projects, private_projects, user);

  const data = [
    {
      labels: ['Public', 'Private'],
      datasets: [
        {
          label: 'Projects',
          data: [public_projects.length, private_projects.length],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    {
      labels: ['Public', 'Private'],
      datasets: [
        {
          label: 'Projects',
          data: [public_projects.length, private_projects.length],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }
  ]

  return (
    <>
      <div className="p-4 xl:p-0">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          <Suspense fallback={'...Cargando'}>
            <Card className="p-10 flex justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold">#{ user?.username }</span>
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

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <Suspense fallback={'...Cargando'}>
              <Card className="p-10 flex flex-col justify-center items-center gap-2">
                <span>Public projects</span>
                <span className="text-2xl font-bold">{public_projects.length}</span>
              </Card>
            </Suspense>

            <Suspense fallback={'...Cargando'}>
              <Card className="p-10 flex flex-col justify-center items-center gap-2">
                <span>Private projects</span>
                <span className="text-2xl font-bold">{private_projects.length}</span>
              </Card>
            </Suspense>
          </section>
          
        </section>
      </div>
    </>
  )
}