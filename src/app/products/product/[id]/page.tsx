import ProductCard from "@/components/ProductCard";
import TableMovements from "@/components/TableMovements";
import { getMovementsByProductId } from "@/libs/fetch/getMovementsByProductId";
import { getProductById } from "@/libs/fetch/getProductById";
import { ChakraProvider, Flex, Box } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Product(context: any) {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  const productId = context.params.id;
  const data = await getProductById(productId);

  if (data === 0) {
    redirect("/login");
  }

  const movements = await getMovementsByProductId(productId);

  return (
    <ChakraProvider>
      <Flex>
        <Box flex="1" p="4">
          <ProductCard product={data} />
        </Box>
        <Box flex="1" p="4">
          <TableMovements label="Movimentações do Produto" movements={movements} />
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
