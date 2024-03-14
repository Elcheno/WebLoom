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
    <>
      {
        route !== 'add' && (
          <Link
            href="/projects/add"
            className="rounded-full bg-white-primary border-gray-50 p-1"
            >
              <div className="flex flex-nowrap items-center gap-2 h-full p-2 border-2 border-white hover:border-black-primary rounded-full transition-colors">
                <PlusCircle className="w-6"/>
                <span>Add Project</span>
              </div>
          </Link>
        )
      }
    </>
  )
}