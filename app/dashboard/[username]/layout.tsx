import NavBar from "@/components/navbar";
import NavLinks from "@/app/dashboard/[username]/components/nav-links";
import { getSession } from "@/app/lib/actions/actions.auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getSession();
  const user = session?.user;

  return (
    <>
      <NavBar>
        <NavLinks user={user}/>
      </NavBar>

      { children }
    </>
  )
}
