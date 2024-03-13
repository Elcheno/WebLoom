import Logo from "./logo"
import NavLinks from "./nav-links"

export default function NavBar() {
  return (
    <nav className="w-full flex justify-start gap-20 py-10">

      <Logo />

      <div className="flex gap-2">
        <NavLinks />
      </div>

    </nav>
  )
}