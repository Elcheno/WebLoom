import { 
  SkeletonCard, 
  SkeletonProfileCard, 
  SkeletonCircleChartCard, 
  SkeletonLastProyectCard,
  SkeletonGradiantChartCard
} from "../../ui/projects/skeletons";
import { Suspense } from "react";
import LastProyectCard from "../../ui/projects/dashboard/last-project-card-server";
import CountLiveProjectsCard from "../../ui/projects/dashboard/count-public-projects-card";
import CountPendingProjectsCars from "../../ui/projects/dashboard/count-pending-projects-card";
import ProfileCard from "../../ui/projects/dashboard/profile-card";
import ProjectsCircleCard from "../../ui/projects/dashboard/projects-circle-card";
import ProjectsGradiantCard from "../../ui/projects/dashboard/projects-gradiant-card";

export default function Dashboard() {
  return (
    <div className="col-start-2 col-end-13 w-full h-full p-10 grid grid-cols-12 grid-rows-12 gap-3">

      <div className="col-start-1 row-start-1 col-end-4 row-end-13">
        <Suspense fallback={<SkeletonLastProyectCard />}>
          <LastProyectCard />
        </Suspense>
      </div>

      <div className="col-start-4 row-start-1 col-end-7 row-end-5">
        <Suspense fallback={<SkeletonCard />}>
          <CountLiveProjectsCard />
        </Suspense>
      </div>

      <div className="col-start-7 row-start-1 col-end-10 row-end-5">
        <Suspense fallback={<SkeletonCard />}>
          <CountPendingProjectsCars />
        </Suspense>
      </div>

      <div className="col-start-10 row-start-1 col-end-13 row-end-5">
        <Suspense fallback={<SkeletonProfileCard />}>
          <ProfileCard />
        </Suspense>
      </div>

      <div className="col-start-4 row-start-5 col-end-10 row-end-13">
        <Suspense fallback={<SkeletonGradiantChartCard />}>
          <ProjectsGradiantCard />
        </Suspense>
      </div>

      <div className="col-start-10 row-start-5 col-end-13 row-end-13">
        <Suspense fallback={<SkeletonCircleChartCard />}>
          <ProjectsCircleCard />
        </Suspense>
      </div>

    </div>
  )
}