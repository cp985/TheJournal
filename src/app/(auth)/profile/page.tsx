import { redirect } from "next/navigation";
import { auth } from "@/auth/auth"
export default async function ProfilePage() {
    const session = await auth()

    console.log('sessione da profile',session)
    
if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "USER" && session.user.role !== "ADMIN") {
    redirect("/");
  }



  return (
    <main className="text-amber-400  inset-0 z-0 h-screen w-screen overflow-hidden bg-zinc-950">
      <h1>profile</h1>
    </main>
  );
}
