import { Suspense } from "react";

export default function LayoutProject({
  children
} : {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="p-4 xl:p-0">
        <Suspense fallback={'...Cargando'}>
          { children }
        </Suspense>
      </div>
    </>
  )
}
