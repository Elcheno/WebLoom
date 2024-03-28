import LoginButton from "./sign-in-button"
import Logo from "./logo"
import NavLinks from "./nav-links"

export default function NavBar() {
  return (
    <nav className="w-full flex justify-between p-5 lg:p-10">

    <div className="flex justify-start gap-20">
      <Logo />

      <NavLinks />
    </div>

    <LoginButton />
    </nav>
  )
}