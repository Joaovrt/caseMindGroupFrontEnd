import LoginCard from "@/components/LoginCard";
import { ChakraProvider } from "@chakra-ui/react";

export default async function Login() {
  return (
    <ChakraProvider>
        <LoginCard/>
    </ChakraProvider>
  );
}
