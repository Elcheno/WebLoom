import Card from "../card"

export function SkeletonCard() {
  return (
    <Card classList={`bg-slate-200 animate-pulse`}>
      <div className="w-full h-full"></div>
    </Card>
  )
}

export function SkeletonProfileCard() {
  return (
    <Card classList={`bg-slate-200 animate-pulse`}>
      <div className="w-full h-full p-5 flex flex-col justify-start">
        <h3 className="text-xl w-full text-gray-200">Projects Type</h3>
        <div className="w-28 h-28 3xl:w-36 3xl:h-36 rounded-full opacity-70 bg-gray-50 m-auto"></div>
      </div>
    </Card>
  )
}

export function SkeletonCircleChartCard() {
  return (
    <Card classList={`bg-slate-200 animate-pulse`}>
      <div className="w-full h-full p-5 flex flex-col justify-start">
        <h3 className="text-xl w-full text-gray-200">Projects Type</h3>
        <div className="w-52 h-52 rounded-full opacity-70 bg-gray-50 m-auto"></div>
      </div>
    </Card>
  )
}

export function SkeletonGradiantChartCard() {
  return (
    <Card classList={`bg-slate-200 animate-pulse`}>
      <div className="w-full h-full p-5 flex flex-col justify-start">
        <h3 className="text-xl w-full text-gray-200">Projects Type</h3>
        
        <div className="flex justify-between items-center h-full w-full">
          <div className="flex flex-col justify-center items-center text-center mx-auto">
            <span className="text-gray-200">Total projects</span>
          </div>
          <div className="w-fit px-5">
            <div className="bg-gray-50 opacity-70 rounded-[2rem] h-[300px] w-[600px] 3xl:h-[450px] 3xl:w-[750px] m-auto"></div>
          </div>
        </div>

      </div>
    </Card>
  )
}

export function SkeletonLastProyectCard() {
  return (
    <Card classList={`bg-slate-200 animate-pulse`}>
      <div className="flex flex-col gap-2 justify-between rounded-[2rem] h-full w-full img-card-backdrop-loader-infinity">  

        <section className="row-start-1 row-end-6 flex justify-between p-5 items-start">
          
        </section>

        <section className="flex flex-col justify-between row-start-7 row-end-12 bg-gray-50 backdrop-blur-[5px] bg-opacity-30 rounded-[2rem] p-5 h-2/4 w-full backdrop-layout-card">
        </section>      
      </div>
    </Card>
  )
}

export function SkeletonProjectList() {
  return (
    <div className="w-full grid grid-cols-1 3xl:grid-cols-2 gap-3">
      {
        Array.from({ length: 4 }).map((_, index) => {
          return (
            <Card classList={`bg-slate-200 animate-pulse`}>
              <div className="w-64 h-64"></div>
            </Card>
          )
        })
      }
    </div>
  )
}

export function SkeletonProjectView () {
  return(
    <>
      <Card classList={`bg-slate-200 animate-pulse`}>
        <div className="w-full h-[264px]"></div>
      </Card>

      <Card classList={`bg-slate-200 animate-pulse`}>
        <div className="w-full h-[264px]"></div>
      </Card> 
    </>
  )
}

export function SkeletonProjectListExplore() {
  return (
    <div className="lg:mx-24 xl:mx-44 2xl:mx-64 3xl:mx-96 grid grid-cols-1 gap-3 mx-auto">
      {
        Array.from({ length: 2 }).map((_, index) => {
          return (
            <Card classList={`bg-slate-200 animate-pulse`}>
              <div className="w-64 h-56"></div>
            </Card>
          )
        })
      }
    </div>
  )
}