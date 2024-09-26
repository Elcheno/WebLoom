"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/16/solid";

export default function CreateProjectButton() {
  return (
    <Button className="w-min">
      <Link href={'projects/add'} className="flex items-center gap-2">
        <PlusIcon className="w-5 h-5" />
        <span>Create project</span>
      </Link>
    </Button>
  )
}
