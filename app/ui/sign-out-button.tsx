'use client';

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const supabase = createClient();
  const router = useRouter();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <button
      onClick={ () => signOut() }
      className="rounded-full py-2 px-4 flex gap-2 items-center bg-black-primary text-white-primary text-nowrap">
      Sign out
    </button>
  )
}