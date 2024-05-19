"use client";

import { Product } from '@/types/product';
import React, { useState, useEffect } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Flex,
    Box,
    Stack,
    Button,
    Heading,
    Textarea,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'
import { getCookie } from 'cookies-next';

interface ProductFormProps {
    cadastrar: boolean;
    product?: Product;
}

export default function ProductForm({ cadastrar, product }: ProductFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        value: 0,
        minimum_value: 0,
        quantity: 0,
        image: null,
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                description: product.description || '',
                value: product.value || 0,
                minimum_value: product.minimum_value || 0,
                quantity: product.quantity || 0,
                image: null,
            });
        }
    }, [product]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>, method: 'POST' | 'PUT') {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        if (!formData.get('image')) {
            formData.delete('image');
        }

        try {
            const token = getCookie('access_token');
            if (!token) {
                throw new Error('Token de autenticação não encontrado.');
            }

            const url = method === 'POST'
                ? `${process.env.NEXT_PUBLIC_API_URL}/product`
                : `${process.env.NEXT_PUBLIC_API_URL}/product/${product?.id}`;

            const response = await fetch(url, {
                method,
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(method === 'POST' ? 'Erro ao cadastrar produto' : 'Erro ao editar produto');
            }

            window.location.href = '/';
        } catch (error) {
            console.error(method === 'POST' ? 'Erro ao cadastrar produto:' : 'Erro ao editar produto:', error);
        }
    }

    return (
        <Flex
            minH={'80vh'}
            align={'center'}
            justify={'center'}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>{cadastrar ? 'Cadastrar Produto' : 'Editar Produto'}</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    boxShadow={'lg'}
                    p={8}>
                    <form onSubmit={(e) => handleSubmit(e, cadastrar ? 'POST' : 'PUT')}>
                        <Stack spacing={4}>
                            <FormControl id="name" isRequired>
                                <FormLabel>Nome</FormLabel>
                                <Input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                            </FormControl>
                            <FormControl id="description" isRequired>
                                <FormLabel>Descrição</FormLabel>
                                <Textarea name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                            </FormControl>
                            <FormControl id="value" isRequired>
                                <FormLabel>Valor</FormLabel>
                                <NumberInput defaultValue={0} min={0} precision={2} name="value" value={formData.value} onChange={(valueString, valueNumber) => setFormData({ ...formData, value: valueNumber })}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <FormControl id="minimum_value" isRequired>
                                <FormLabel>Quantidade mínima de estoque</FormLabel>
                                <NumberInput defaultValue={0} min={0} name="minimum_value" value={formData.minimum_value} onChange={(valueString, valueNumber) => setFormData({ ...formData, minimum_value: valueNumber })}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            {cadastrar && (
                                <FormControl id="quantity" isRequired>
                                    <FormLabel>Quantidade</FormLabel>
                                    <NumberInput defaultValue={0} min={0} name="quantity" value={formData.quantity} onChange={(valueString, valueNumber) => setFormData({ ...formData, quantity: valueNumber })}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl>
                            )}
                            <FormControl id="image">
                                <FormLabel>Imagem</FormLabel>
                                <Input type="file" name="image" accept=".jpg, .jpeg, .png" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    type="submit"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    {cadastrar ? 'Cadastrar' : 'Editar'}
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
}