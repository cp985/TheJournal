import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";
export  default async function  AdminDashboard(){
    const session = await  auth()
    
if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }
    return(

        <main>
        <h1>admin dashboard</h1>
        </main>
    )
}