import { getSession } from "@/app/lib/actions/actions.auth"
import Logo from "@/components/logo"
import SessionButton from "@/components/sessionButton";

export default async function NavBar({
  children
} : {
  children?: React.ReactNode
}) {
  
  const session = await getSession();
  console.log(session);
  

  return (
    <>
      <nav className="w-full flex flex-col px-4 py-2 gap-5 bg-white-primary">
        <div className="w-full flex justify-between">
          <div className="flex justify-start gap-6">
            <Logo />

            { children }
          </div>

          <SessionButton session={session} />
        </div>

        {/* <div className="px-2">
          { children }
        </div> */}
      </nav>
    </>
  )
}