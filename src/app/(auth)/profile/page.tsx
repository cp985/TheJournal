import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loader from "@/components/layout/loader";
export default function ProfilePage() {
  const { data: session, status } = useSession();
     if (status === "loading") return <Loader />;

 
  if (!session?.user) {
    redirect("/login");
  }



  return (
    <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-zinc-950">
      <h1>profile</h1>
    </div>
  );
}
