import { Card } from "./ui/card";

export function SkeletonProjectCard() {
  return (
    <Card className="max-w-[28rem] min-w-[19rem] h-[11.8rem] bg-white animate-pulse">
      <div className="p-5 grid grid-rows-3">    
        <div className="flex gap-2 items-center">
          <div className="w-10 h-10 bg-slate-50 rounded-full"></div>
          <div className="w-1/4 h-8 bg-slate-50 rounded-full"></div>
        </div>
        <div className="my-auto w-3/4 h-2 bg-slate-50 rounded-full"></div>
        <div className="flex justify-between items-center">
          <div className="w-1/6 h-4 bg-slate-50 rounded-full"></div>
          <div className="w-1/6 h-4 bg-slate-50 rounded-full"></div>
        </div>
      </div>
    </Card>
  )
}

export function SkeletonProjectList() {
  return (
    <div 
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(19rem, 1fr))"}} 
      className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SkeletonProjectCard />
        <SkeletonProjectCard />
    </div>
  )
}
