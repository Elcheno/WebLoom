"use client";

import { Search } from "lucide-react"
import { useState } from "react";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const WAIT_BETWEEN_CHANGE = 500;

export default function SearchBar() {
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
    <div className="w-3/4">
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