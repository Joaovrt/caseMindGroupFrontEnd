"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useToast
} from '@chakra-ui/react';

import {signIn} from "next-auth/react"
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginCard() {
  const toast = useToast();
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  useEffect(()=>{
    if(error=="CredentialsSignin")
      toast({
        title:'Erro',
        description: 'Usuário ou senha inválidos',
        status: 'error',
        duration: 5000,
        isClosable: true,
    });
  },[error])

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data ={
      email:formData.get('email'),
      password:formData.get('password')
    }
    signIn("credentials",{...data,callbackUrl:"/products/all"})
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sistema de Estoque</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Gerencie melhor seus produtos!
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          boxShadow={'lg'}
          p={8}>
          <form onSubmit={login}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>E-mail</FormLabel>
                <Input type="email" name="email"/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Senha</FormLabel>
                <Input type="password" name="password"/>
              </FormControl>
              <Stack spacing={10}>
                <Button
                  type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Entrar
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}