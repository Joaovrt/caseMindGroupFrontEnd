import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Product() {

  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  

  return (
    <div>
      
    </div>
  );
}
