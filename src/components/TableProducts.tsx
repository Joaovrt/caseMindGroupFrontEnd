"use client";

import { Product } from '@/types/product';
import React, { useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    Link,
    useToast
} from '@chakra-ui/react';
import { getCookie } from 'cookies-next';
import Alert from './Alert';

interface TableProductsProps {
    label: string;
    products: Product[];
}

interface TableProductsProps {
    label: string;
    products: Product[];
}

export default function TableProducts({ label, products }: TableProductsProps) {
    const toast = useToast();
    const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    async function deleteProduct(productId: number) {
        try {
            const token = getCookie('access_token');
            if (!token) {
                throw new Error('Token de autenticação não encontrado.');
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir produto');
            }
            toast({
                title: 'Sucesso',
                description: 'O produto foi deletado com sucesso.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            window.location.href = '/';
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            toast({
                title: 'Erro',
                description: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    }

    const handleDeleteConfirmation = (productId: number) => {
        setProductIdToDelete(productId);
        setIsAlertOpen(true);
    };

    const handleDeleteCancel = () => {
        setIsAlertOpen(false);
        setProductIdToDelete(null);
    };

    const handleDeleteConfirm = () => {
        setIsAlertOpen(false);
        if (productIdToDelete) {
            deleteProduct(productIdToDelete);
        }
        setProductIdToDelete(null);
    };

    return (
        <>
            <Alert
                isOpen={isAlertOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
            />
            <TableContainer>
                <Table variant='striped'>
                    <TableCaption placement="top" fontSize="lg">{label}</TableCaption>
                    <Thead>
                        <Tr>
                            <Th isNumeric>Id</Th>
                            <Th>Nome</Th>
                            <Th isNumeric>Preço (R$)</Th>
                            <Th isNumeric>Estoque Mínimo</Th>
                            <Th isNumeric>Quantidade</Th>
                            <Th isNumeric>Ações</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {products.map(product => (
                            <Tr key={product.id}>
                                <Td isNumeric>{product.id}</Td>
                                <Td>{product.name}</Td>
                                <Td isNumeric>{product.value}</Td>
                                <Td isNumeric>{product.minimum_value}</Td>
                                <Td isNumeric color={product.quantity <= product.minimum_value ? "red" : product.quantity <= product.minimum_value + 5 ? "orange" : "green"}>
                                    {product.quantity}
                                </Td>
                                <Td isNumeric>
                                    <Link
                                        _hover={{
                                            textDecoration: 'none'
                                        }}
                                        href={`/products/product/${product.id}`}>
                                        <Button marginRight={2} colorScheme='blue'>Detalhes</Button>
                                    </Link>
                                    <Link
                                        _hover={{
                                            textDecoration: 'none'
                                        }}
                                        href={`/products/edit/${product.id}`}>
                                        <Button marginRight={2} colorScheme='green'>Editar</Button>
                                    </Link>
                                    <Button colorScheme='red' onClick={() => handleDeleteConfirmation(product.id)}>Deletar</Button>
                                    <Link
                                        _hover={{
                                            textDecoration: 'none'
                                        }}
                                        href={`/products/movement/${product.id}`}>
                                        <Button marginLeft={2} colorScheme='yellow'>Movimentação</Button>
                                    </Link>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}