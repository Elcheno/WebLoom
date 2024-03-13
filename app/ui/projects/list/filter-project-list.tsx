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

  const handlerChangeState = (state: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('state', state);
    replace(`${pathname}?${params.toString()}`)
  }

  let defaultValue: string = 'all';
  const params = new URLSearchParams(searchParams);

  if (params.get('state')) {
    defaultValue = params.get('state') || 'all';
  } else {
    params.set('state', defaultValue);
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Select defaultValue={ defaultValue } onValueChange={ (state) => handlerChangeState(state) }>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="State" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="live">Public</SelectItem>
        <SelectItem value="pending">Private</SelectItem>
      </SelectContent>
    </Select>
  )
}