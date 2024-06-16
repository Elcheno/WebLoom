"use client";

import { useFormState, useFormStatus } from "react-dom";
import { authenticateWithGithub } from "../lib/actions/actions.auth"
 
export default function Page() {
  const [ GithubErrorMessage, github ] = useFormState(authenticateWithGithub, undefined);

  return (
    <>
      <form action={github}>
        <LoginWithGithubButton />
        <span>{GithubErrorMessage}</span>
      </form>
    </>
  )
}

function LoginWithGithubButton() {
  const { pending } = useFormStatus()

  const handleClick = (event: any) => {
    if (pending) {
      event.preventDefault()
    }
  }

  return (
    <button className="bg-black text-white py-2 px-4 rounded-lg" aria-disabled={pending} type="submit" onClick={handleClick}>
      Login With Github
    </button>
  )
}
