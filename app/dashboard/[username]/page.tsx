import { getSession } from "@/app/lib/actions/actions.auth";

import { Card } from "@/components/ui/card";
import {
  CardUser,
  CardPrivateProject,
  CardPublicProject,
  CardLastProject,
  CardProjectHistory,
} from "./components";

import {
  CardUserSkeleton,
  CardProjectCountSkeleton,
  CardProjectContentSkeleton,
} from "./components/skeletons";

import { Suspense } from "react";

export default async function Dashboard() {
  const session = await getSession();
  const session_user = session?.user;

  return (
    <>
      <div className="p-4 xl:p-0 flex flex-col gap-8">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Suspense fallback={<CardUserSkeleton />}>
            <CardUser email={session_user?.email || null} />
          </Suspense>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <Suspense fallback={<CardProjectCountSkeleton />}>
              <CardPublicProject />
            </Suspense>
            <Suspense fallback={<CardProjectCountSkeleton />}>
              <CardPrivateProject />
            </Suspense>
          </section>
        </section>

        <section className="grid grid-cols-1">
          <Card className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-10 p-5">
            <section className="flex justify-center items-center w-full h-full">
              <Suspense fallback={<CardProjectContentSkeleton />}>
                <CardLastProject />
              </Suspense>
            </section>

            <section className="flex justify-center items-center">
              <Suspense fallback={<CardProjectContentSkeleton />}>
                <CardProjectHistory />
              </Suspense>
            </section>
          </Card>
        </section>
      </div>
    </>
  );
}
