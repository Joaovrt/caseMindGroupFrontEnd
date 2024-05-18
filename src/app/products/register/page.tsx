import ProductForm from "@/components/ProductForm";
import { ChakraProvider } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Products() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  
  return (
    <ChakraProvider>
      <ProductForm cadastrar={true}></ProductForm>
    </ChakraProvider>
  );
}
