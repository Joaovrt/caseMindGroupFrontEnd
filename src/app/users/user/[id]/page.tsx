import TableMovements from "@/components/TableMovements";
import { getMovementsByUserId } from "@/libs/fetch/getMovementsByUserId";
import { ChakraProvider } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function User(context: any) {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  const userId = context.params.id;
  const movements = await getMovementsByUserId(userId);

  if (movements === 0) {
    redirect("/login");
  }

  
  return (
    <ChakraProvider>
          <TableMovements label="Movimentações do Usuário" movements={movements} />
    </ChakraProvider>
  );
}
