import LinkButton from "@/components/LinkButton";
import TableProducts from "@/components/TableProducts";
import { getProducts } from "@/libs/fetch/getProducts";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Products() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  const data = await getProducts();
  if (data == 0) {
    redirect("/login");
  }
  return (
    <ChakraProvider>
      <Box textAlign="right" mt={4} mr={4}>
        <LinkButton 
          color="green" 
          label="Cadastrar Produto" 
          link="/products/register"
        />
      </Box>
      <TableProducts label="Produtos" products={data}/>
    </ChakraProvider>
  );
}
