import LoginCard from "@/components/LoginCard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ChakraProvider } from "@chakra-ui/react";

export default async function Login() {
  return (
    <ChakraProvider>
        <LoginCard/>
    </ChakraProvider>
  );
}
