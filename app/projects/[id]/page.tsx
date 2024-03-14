import { fetchProjectById } from '@/app/lib/data';
import PageViewProject from '@/app/ui/projects/viewProject/viewProject';
import { Suspense } from 'react';

export default async function ViewProject({ params }: { params: { id: string }}) {
  const project = (await fetchProjectById({ id: Number(params.id) }))?.[0];

  return (
    <main className="col-start-3 col-end-11 flex flex-col gap-10 p-10">
      <Suspense fallback={'Loading...'}>
        <PageViewProject project={project}/>
      </Suspense>
    </main>
  )
}