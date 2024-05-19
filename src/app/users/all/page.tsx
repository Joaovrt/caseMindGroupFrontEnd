import LinkButton from "@/components/LinkButton";
import TableUsers from "@/components/TableUsers";
import { getUsers } from "@/libs/fetch/getUsers";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Products() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  const data = await getUsers();
  if (data == 0) {
    redirect("/login");
  }
  return (
    <ChakraProvider>
      <Box textAlign="right" mt={4} mr={4}>
        <LinkButton 
          color="green" 
          label="Cadastrar Usuário" 
          link="/users/register"
        />
      </Box>
      <TableUsers label="Usuários" users={data}/>
    </ChakraProvider>
  );
}
