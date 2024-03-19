import { SkeletonProjectView } from '@/app/ui/projects/skeletons';
import PageViewProject from '@/app/ui/projects/viewProject/viewProject';
import { Suspense } from 'react';

export default function ViewProject({ params }: { params: { name: string } }) {
  return (
    <main className="col-start-3 col-end-11 flex flex-col gap-10 p-10">
      <Suspense fallback={<SkeletonProjectView />}>
        <PageViewProject params={params}/>
      </Suspense>
    </main>
  )
}