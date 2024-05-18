import TableProducts from "@/components/TableProducts";
import { getProducts } from "@/libs/fetch/getProducts";
import { ChakraProvider } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function Products() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  const data = await getProducts();
  if(data==0){
    await signOut()
    redirect("/login")
  }
  return (
    <ChakraProvider>
      <TableProducts label="Produtos" products={data}/>
    </ChakraProvider>
  );
}
