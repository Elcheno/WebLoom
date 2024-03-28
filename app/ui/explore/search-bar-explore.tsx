"use client";

import { useState } from "react";
import { Search } from "lucide-react"
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const WAIT_BETWEEN_CHANGE = 500;

export default function SearchBarExplore() {
  const [ state, setState ] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    params.set('page', '1');

    replace(`${pathname}?${params.toString()}`)
  }, WAIT_BETWEEN_CHANGE);

  return (
    <div className="lg:mx-24 xl:mx-44 2xl:mx-64 3xl:mx-96 w-full mx-auto">
      <div className="flex flex-nowrap bg-white-primary justify-start items-center rounded-full border border-gray-200">
        <Search className={`w-6 h-6 ml-2 transition-colors ${ state ? "text-black-primary" : "text-gray-600" }`}/>
        <input 
          type="text" 
          className="w-full p-2 rounded-full outline-none"
          onFocus={ () => setState(true) }
          onBlur={ () => setState(false) }
          onChange={ (e) => handleSearch(e.target.value) }
          defaultValue={ searchParams.get('query') || '' }
        />
      </div>
    </div>
  )
}

