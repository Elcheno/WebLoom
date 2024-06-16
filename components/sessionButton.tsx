"use client";
import { 
  ArrowRightEndOnRectangleIcon,
  UserIcon,
  AdjustmentsHorizontalIcon,
  ArrowRightStartOnRectangleIcon
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { logOut } from "@/app/lib/actions/actions.auth";
import { Button } from "@/components/core";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useFormStatus } from "react-dom";

export default function SessionButton({
  session
} : {
  session: any | null
}) {  
  return (
    session !== null
      ? <SessionState user={session?.user}/>
      : <SignInButton />
      
  )
}

function SignInButton() {
  return (
    <Button>
      <Link href={'/login'} className="flex flex-row gap-2">
        <ArrowRightEndOnRectangleIcon className="w-6 h-6" />
        <span className="text-sm select-none">Sign In</span>
      </Link>
    </Button>
  )
}

function SessionState({ user }: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.image} alt={user.username} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{ user.name }</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link className="w-full flex justify-between items-center" href={`/dashboard/${user.name}/profile`}>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <AdjustmentsHorizontalIcon className="mr-2 h-4 w-4" />
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {/* <Github className="mr-2 h-4 w-4" /> */}
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          {/* <Cloud className="mr-2 h-4 w-4" /> */}
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <form action={logOut}>
          <LogOutButton />
        </form>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}


function LogOutButton() {
  const { pending } = useFormStatus()

  const handleClick = (event: any) => {
    console.log(pending);
    
    if (pending) {
      event.preventDefault()
    }
  }

  return (
    <DropdownMenuItem asChild>
      <button className="w-full" onClick={handleClick}>
        <ArrowRightStartOnRectangleIcon className="mr-2 h-4 w-4" />
        <span>Log out</span>
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </button>
    </DropdownMenuItem>
  )
}
