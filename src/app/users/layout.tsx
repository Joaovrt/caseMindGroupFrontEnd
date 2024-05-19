import Navbar from "@/components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";

export default function UsersLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <ChakraProvider>
        <Navbar/>
        {children}
      </ChakraProvider>
    );
  }