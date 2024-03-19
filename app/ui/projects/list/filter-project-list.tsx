"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function FilterProjectList() {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handlerChangeState = (visibility: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('visibility', visibility);
    replace(`${pathname}?${params.toString()}`)
  }

  let defaultValue: string = 'all';
  const params = new URLSearchParams(searchParams);

  if (params.get('visibility')) {
    defaultValue = params.get('visibility') || 'all';
  } else {
    params.set('visibility', defaultValue);
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Select defaultValue={ defaultValue } onValueChange={ (visibility) => handlerChangeState(visibility) }>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="State" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="public">Public</SelectItem>
        <SelectItem value="private">Private</SelectItem>
      </SelectContent>
    </Select>
  )
}