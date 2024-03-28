import ExploreNavLinks from "./explore-nav-links";


export default function ExploreNavBar() {
  return (
    <div className="lg:w-full lg:h-3/6 flex lg:flex-col justify-center lg:justify-start align-top sticky top-0 gap-10 lg:gap-2">
      <ExploreNavLinks />
    </div>
  )
}