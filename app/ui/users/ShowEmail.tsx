import { fetchUsers } from "@/app/lib/data";

export default async function ShowEmail() {
  const users = await fetchUsers();
  const email = users ? users[0].email : 'Sin email';

  return (
    <div>
      <p>{ email }</p>
    </div>
  )
}