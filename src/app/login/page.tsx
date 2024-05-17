import LoginCard from "@/components/LoginCard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ChakraProvider } from "@chakra-ui/react";

export default async function Login() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }

  return (
    <ChakraProvider>
        <LoginCard/>
    </ChakraProvider>
  );
}
