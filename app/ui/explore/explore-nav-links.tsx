'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { LayoutGrid, Users } from "lucide-react";

const links = [
  {
    href: '/explore/projects',
    icon: LayoutGrid
  },
  {
    href: '/explore/users',
    icon: Users
  }
]

export default function ExploreNavLinks() {
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