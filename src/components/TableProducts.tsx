"use client";

import { Product } from '@/types/product';
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
    Link // Importe o componente Box
} from '@chakra-ui/react';
import { getCookie } from 'cookies-next';

interface TableProductsProps {
    label: string;
    products: Product[];
}

export default function TableProducts({ label, products }: TableProductsProps) {
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
    
            window.location.href = '/';
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
        }
    }
    return (
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
                                    <Button colorScheme='red' onClick={()=>deleteProduct(product.id)}>Deletar</Button>
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
    );
}
