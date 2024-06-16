
import { getSession } from "../lib/actions/actions.auth";

export default async function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      { children }
    </>
  )
}
