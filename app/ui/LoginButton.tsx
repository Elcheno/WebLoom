
import { createClient } from "@/utils/supabase/server";
import { LogIn } from "lucide-react";
import Link from "next/link";
import SignOutButton from "./sign-out-button";

export default async function LoginButton() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  return (
    session !== null
      ? (
        <SignOutButton />
      ) : (
        <Link href={'/sign-in'} className="flex gap-2 items-center py-2 px-4 rounded-full bg-black-primary text-white-primary">
          <LogIn className="w-6 h-6"/>
          Sign in
        </Link>
      )
  )
}