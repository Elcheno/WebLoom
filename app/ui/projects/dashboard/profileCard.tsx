import { fetchUser } from "@/app/lib/data";
import Card from "../../card";

export default async function ProfileCard() {
  const userList = await fetchUser();
  const user = userList ? userList[0] : null;

  return (
    <Card>
      <div className="w-full h-full p-5 flex flex-col">
        <h3 className="text-xl w-full">Profile</h3>
        <div className="flex justify-center items-center h-full">
          <div className="w-28 h-28 3xl:w-36 3xl:h-36 rounded-full text-black-primary bg-gradient-to-br from-[#D7DDE8] to-[#EDFD93] hover:shadow-[0px_0px_12px_8px_#00000024] transition-all duration-200 hover:cursor-pointer flex justify-center items-center">
            <span className="text-3xl">{ user?.name.charAt(0).toUpperCase() }</span>
          </div>
        </div>
      </div>
    </Card>
  )
}