"use client";

import { Product } from '@/types/product';
import React, { useState, useEffect } from 'react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Flex,
    Box,
    Stack,
    Button,
    Heading,
    Text,
    Textarea,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'
import { getCookie } from 'cookies-next';

interface ProductFormProps {
    cadastrar:boolean
    product?:Product
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

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.forEach((value, key) => {
            console.log(key, value);
        });
        try {
            const token = getCookie('access_token');
            if (!token) {
                throw new Error('Token de autenticação não encontrado.');
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar produto');
            }

            window.location.href = '/';
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
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
                    <form onSubmit={submit}>
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
                                <NumberInput defaultValue={0} min={0} precision={2} name="value" value={formData.value} onChange={(value) => setFormData({ ...formData, value: value })}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <FormControl id="minimum_value" isRequired>
                                <FormLabel>Quantidade mínima de estoque</FormLabel>
                                <NumberInput defaultValue={0} min={0} name="minimum_value" value={formData.minimum_value} onChange={(value) => setFormData({ ...formData, minimum_value: value })}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <FormControl id="quantity" isRequired>
                                <FormLabel>Quantidade</FormLabel>
                                <NumberInput defaultValue={0} min={0} name="quantity" value={formData.quantity} onChange={(value) => setFormData({ ...formData, quantity: value })}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
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
    )
}