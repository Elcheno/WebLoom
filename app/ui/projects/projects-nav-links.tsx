"use client";

import { LayoutGrid, LayoutList, PlusCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const links = [
  {
    href: '/projects/dashboard',
    icon: LayoutGrid
  },
  {
    href: '/projects/list',
    icon: LayoutList
  },
  {
    href: '/projects/add',
    icon: PlusCircle
  },
];

export default function ProjectsNavLinks() {
  const pathname = usePathname();

  return (
    <>
      {
        links.map((link) => {
          const LinkIcon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                rounded-full p-3 mx-auto link_url h-fit
                ${ pathname === link.href ? 'bg-black-primary text-white-primary' : '' }
              `}
            >
              <LinkIcon className='w-6'/>
            </Link>
          )
        })
      }
    </>
  )
}