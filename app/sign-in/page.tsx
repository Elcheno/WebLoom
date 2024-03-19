"use client";

import { createClient } from "@/utils/supabase/client";

export default function Page() {
  const supabase = createClient();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    })
  }

  return(
    <main className="w-full flex flex-col gap-20 items-center">
      
      <section className="flex justify-start w-full pl-10">
        <h1 className="text-4xl">Sign in</h1>
      </section>
      
      <section className="flex justify-center gap-20 items-center">
        <button
          onClick={ () => handleSignIn() }
          className="rounded-full py-2 px-4 flex gap-2 items-center bg-black-primary text-white-primary">
          Sign in with GitHub
        </button> 


      </section>
    </main>
  )
}