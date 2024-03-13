"use client";

import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { usePathname } from 'next/navigation';
import { useEffect } from "react";

export default function AddProjectsButton() {
  const pathname = usePathname();
  let route = pathname.split('/').slice(2, 3).join('/');

  useEffect(() => {
    route = pathname.split('/').slice(2, 3).join('/');
  }, [usePathname()]);

  return (
    <div className="">
      {
        route !== 'add' && (
          <Link
            href="/projects/add"
            className="flex flex-nowrap gap-2 rounded-full bg-white-primary border border-gray-50 p-3 m-auto h-fit"
            >
            <PlusCircle className="w-6"/>
            <span>Add Project</span>
          </Link>
        )
      }
    </div>
  )
}