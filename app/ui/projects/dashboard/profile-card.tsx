import { fetchUser } from "@/app/lib/data";
import Card from "../../card";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function ProfileCard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <Card>
      <div className="w-full h-full p-5 flex flex-col">
        <h3 className="text-xl w-full">Profile</h3>
        <Link href={'/settings'} className="flex justify-center items-center h-full">
          <img 
            src={`${user?.user_metadata.avatar_url}`} 
            alt="" 
            className="w-20 h-20 3xl:w-28 3xl:h-28 rounded-full hover:shadow-[0px_0px_12px_8px_#00000024] transition-all duration-200"
          />
        </Link>
        <Link href={'/settings'} className="text-gray-400 text-lg mx-auto hover:underline">@{ user?.user_metadata.user_name }</Link>
      </div>
    </Card>
  )
}