"use client";

import { formatUrl } from "@/app/utils/format"

export default function LinkProject({
  url
  } : {
    url: string | undefined
  }
) {
  return (
    <a
      className="hover:text-blue-400 text-nowrap text-ellipsis overflow-hidden"
      onClick={ (event) => event.stopPropagation() } 
      target="_blank"
      href={url}>
      { formatUrl(url ?? '') }
    </a>
  )
}