"use client";

import { useState } from 'react';
import { Product } from '@/types/product';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Text,
  Stack,
  Button,
  Heading,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast
} from '@chakra-ui/react';
import { getCookie } from 'cookies-next';

interface MovementCardProps {
  product: Product;
}

export default function MovementCard({ product }: MovementCardProps) {
  const [movementType, setMovementType] = useState<string | null>(null);
  const toast = useToast();
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      type: formData.get('type'),
      quantity: parseInt(formData.get('quantity') as string, 10)
    };

    try {
      const token = getCookie('access_token');
      if (!token) {
        throw new Error('Token de autenticação não encontrado.');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/movement/${product.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Erro ao registrar movimentação de estoque.');
      }

      const result = await response.json();
      console.log('Movimentação registrada com sucesso:', result);
      toast({
        title: 'Sucesso',
        description: 'Movimentação registrada com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
    });

      window.location.href = '/';
    } catch (error) {
      console.error('Erro ao registrar movimentação de estoque:', error);
      toast({
        title:'Erro',
        description: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
    });
      
    }
  }

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMovementType(e.target.value);
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Movimentação de estoque</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Estoque atual: {product.quantity}
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          boxShadow={'lg'}
          p={8}>
          <form onSubmit={submit}>
            <Stack spacing={4}>
              <FormControl id="type" isRequired>
                <FormLabel>Tipo de movimentação</FormLabel>
                <Select placeholder='Selecione...' name="type" onChange={handleTypeChange}>
                  <option value='entrada'>Entrada</option>
                  <option value='saida'>Saida</option>
                </Select>
              </FormControl>
              <FormControl id="quantity" isRequired>
                <FormLabel>Quantidade</FormLabel>
                <NumberInput
                  defaultValue={1}
                  name="quantity"
                  min={1}
                  max={movementType === 'saida' ? product.quantity : undefined}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <Stack spacing={10}>
                <Button
                  type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Registrar
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
