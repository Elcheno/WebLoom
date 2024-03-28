"use client";

import { usePathname } from 'next/navigation';
import { LayoutGrid, Settings, Home, Compass, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

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
  const navRef = useRef(null) as any;
  const [open, setOpen] = useState(false);

  let pathname = usePathname();
  pathname = pathname.split('/').slice(0, 2).join('/');

  useEffect(() => { 
    navRef.current?.classList.add('hidden') 
  }, [pathname])

  const handlerOpen = () => {
    navRef.current?.classList.toggle('hidden');
    open === true
      ? setOpen(false)
      : setOpen(true)
  }

  return (
    <>
      <button className='lg:hidden' onClick={ () => handlerOpen() }>
        {
          open === false
            ? (<Menu className='w-8 h-8' />)
            : (<X className='w-8 h-8' />)
        }
      </button>
      <nav ref={ navRef } className='fixed top-40 left-10 bg-white-primary rounded-2xl p-4 lg:p-0 w-4/5 lg:relative lg:top-0 lg:left-0 z-10 hidden lg:block lg:border-none lg:bg-transparent border border-gray-40 bg-opacity-50 backdrop-blur-[6px]'>
        <div className='flex flex-col gap-2 lg:flex-row'>
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
        </div>
      </nav>
    </>
  )
}