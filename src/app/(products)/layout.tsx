import Navbar from "@/components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";

export default function ProductsLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div lang="en">
        <ChakraProvider>
            <Navbar/>
            {children}
        </ChakraProvider>
      </div>
    );
  }