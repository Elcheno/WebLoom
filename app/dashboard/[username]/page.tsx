"use client"

import { usePathname } from "next/navigation";

export default function Dashboard() {
  const pathname = usePathname();
  // const simple_username = pathname?.split('/')[1];

  return (
    <>
      <h1>Dashboard</h1>
    </>
  )
}