import ExploreNavBar from "../ui/explore/explore-nav-bar";


export default function ExploreLayout({
  children
} : {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-full flex flex-col items-center mb-10">
      <section className="flex justify-start w-full pl-10">
        <h1 className="text-4xl">Explore</h1>
      </section>

      <section className="w-full grid grid-cols-12 grid-rows-1">

        <nav className="col-start-1 col-end-13 lg:col-end-2 h-full pt-10 lg:pl-10 flex justify-center">
          <ExploreNavBar />
        </nav>

        { children }

      </section>
    </main>
  )
}