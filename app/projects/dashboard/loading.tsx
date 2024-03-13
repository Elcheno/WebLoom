import { 
  SkeletonCard, 
  SkeletonProfileCard, 
  SkeletonCircleChartCard, 
  SkeletonLastProyectCard,
  SkeletonGradiantChartCard
} from "../../ui/projects/skeletons";

export default function Loading() {
  return (
    <section className="col-start-2 col-end-13 w-full h-full p-10 grid grid-cols-12 grid-rows-12 gap-3">

      <div className="col-start-1 row-start-1 col-end-4 row-end-13">
        <SkeletonLastProyectCard />
      </div>

      <div className="col-start-4 row-start-1 col-end-7 row-end-5">
        <SkeletonCard />
      </div>

      <div className="col-start-7 row-start-1 col-end-10 row-end-5">
        <SkeletonCard />
      </div>

      <div className="col-start-10 row-start-1 col-end-13 row-end-5">
        <SkeletonProfileCard />
      </div>

      <div className="col-start-4 row-start-5 col-end-10 row-end-13">
        <SkeletonGradiantChartCard />
      </div>

      <div className="col-start-10 row-start-5 col-end-13 row-end-13">
        <SkeletonCircleChartCard />
      </div>
    </section>
  )
}