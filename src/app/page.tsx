import * as React from 'react'
import { ChakraProvider } from "@chakra-ui/react";
import SimpleCard from '@/pages/login/page';

export default function Home() {
  return (
    <ChakraProvider>
      <main>
        <SimpleCard/>
      </main>
  </ChakraProvider>
  );
}
