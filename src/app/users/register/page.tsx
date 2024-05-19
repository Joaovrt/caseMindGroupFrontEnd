import UserForm from "@/components/UserForm";
import { ChakraProvider } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RegisterUser() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  
  return (
    <ChakraProvider>
      <UserForm cadastrar={true}></UserForm>
    </ChakraProvider>
  );
}
