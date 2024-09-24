import { getUserByEmail } from "@/app/lib/data/data.users";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function CardUser({ email }: { email: string | null }) {
  const user = await getUserByEmail(email ?? "");

  return (
    <Card className="p-10 flex justify-between">
      <div className="flex flex-col gap-1">
        <span className="text-2xl font-bold">#{user?.username}</span>
        <span className="text-xl">{user?.name}</span>
      </div>
      <div className="h-[60px] flex items-center">
        <Avatar className="h-full w-full">
          <AvatarImage src={user?.avatar_url} alt={user?.username} />
          <AvatarFallback>{user?.username[0] || ""}</AvatarFallback>
        </Avatar>
      </div>
    </Card>
  );
}
