"use client";

import { usePathname } from 'next/navigation';
import { LayoutGrid, Settings, Home, Compass } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

const links = [
  {
    name: 'Home',
    href: '/',
    icon: Home
  },
  {
    name: 'Projects',
    href: '/projects/dashboard',
    icon: LayoutGrid
  },
  {
    name: 'Explore',
    href: '/explore/projects',
    icon: Compass
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings
  },
]

export default function NavLinks() {
  let pathname = usePathname();
  pathname = pathname.split('/').slice(0, 2).join('/');

  return (
    <>
      {
        links.map((link) => {
          const LinkIcon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`
                 rounded-full py-2 px-4 flex gap-2 items-center link_url
                ${ pathname === link.href.split('/').slice(0, 2).join('/') ? 'bg-black-primary text-white-primary' : '' }
              `}
            >
            <LinkIcon className='w-6'/>
            <p>{ link.name }</p>
            </Link>
          )
        })
      }
    </>
  )
}