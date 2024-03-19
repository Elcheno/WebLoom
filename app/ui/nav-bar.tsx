import LoginButton from "./LoginButton"
import Logo from "./logo"
import NavLinks from "./nav-links"

export default function NavBar() {
  return (
    <nav className="w-full flex justify-between p-10">

    <div className="flex justify-start gap-20">
      <Logo />

      <div className="flex gap-2">
        <NavLinks />
      </div>
    </div>

    <LoginButton />
    </nav>
  )
}