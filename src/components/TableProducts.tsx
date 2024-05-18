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
import { redirect } from "next/navigation";

interface TableProductsProps {
    label: string;
    products: Product[];
}

export default function TableProducts({ label, products }: TableProductsProps) {

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
                        <Th isNumeric>Ações</Th> {/* Adicionei uma nova coluna para os botões */}
                    </Tr>
                </Thead>
                <Tbody>
                    {products.map(product => (
                        <Tr key={product.id}>
                            <Td isNumeric>{product.id}</Td>
                            <Td>{product.name}</Td>
                            <Td isNumeric>{product.value}</Td>
                            <Td isNumeric>{product.minimum_value}</Td>
                            <Td isNumeric color={product.quantity <= product.minimum_value ? "red.500" : product.quantity <= product.minimum_value + 5 ? "orange.500" : "green.500"}>
                                {product.quantity}
                            </Td>
                            <Td isNumeric>
                                <Link
                                _hover={{
                                    textDecoration: 'none'
                                }}
                                href={`/product/${product.id}`}>
                                    <Button marginRight={2} colorScheme='blue'>Detalhes</Button>
                                </Link>
                                <Link
                                _hover={{
                                    textDecoration: 'none'
                                }}
                                href={`/product/edit/${product.id}`}>
                                    <Button marginRight={2} colorScheme='green'>Editar</Button>
                                </Link>
                                    <Button colorScheme='red'>Deletar</Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
