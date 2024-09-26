"use client";

import { SearchInput } from "@/components/core";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { CreateProjectButton } from "@/components/custom";

const WAIT_BETWEEN_CHANGE = 500;

export default function SearchBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    params.set("page", "1");

    replace(`${pathname}?${params.toString()}`);
  }, WAIT_BETWEEN_CHANGE);

  const handleVisibility = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("visibility", value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="w-full flex flex-col gap-2 md:flex-row">
        <SearchInput
          className="w-full"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query") || ""}
        />

        <div className="flex gap-2">
          <Select
            value={searchParams.get("visibility") || "all"}
            onValueChange={handleVisibility}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="public">Public</SelectItem>
            </SelectContent>
          </Select>

          <CreateProjectButton />
        </div>
      </div>
    </>
  );
}
