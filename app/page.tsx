import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const canInitSupabaseClient = () => {

    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <main className="w-full flex flex-col gap-20 items-center">
      
      <section className="flex justify-start w-full pl-10">
        <h1 className="text-4xl">Home</h1>
      </section>
      
      <section>
        <p className="text-3xl">Coming soon...</p>
      </section>
    </main>
  );
}
