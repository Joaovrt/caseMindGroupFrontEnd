import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Products() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <div>
        Olá, {session?.user?.name}
      </div>
      <div>
        Olá, {session?.user?.email}
      </div>
    </div>
  );
}
