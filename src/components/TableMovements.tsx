"use client";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer
} from '@chakra-ui/react';
import { Movement } from '@/types/movement';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'

interface TableMovementsProps {
    label: string;
    movements: Movement[];
}

export default function TableMovements({ label, movements }: TableMovementsProps) {
    return (
        <TableContainer>
            <Table variant='striped'>
                <TableCaption placement="top" fontSize="lg">{label}</TableCaption>
                <Thead>
                    <Tr>
                        <Th isNumeric>Id</Th>
                        <Th>Usuário</Th>
                        <Th>Tipo</Th>
                        <Th>Data</Th>
                        <Th isNumeric>Quantidade</Th>
                        <Th isNumeric>Saldo</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {movements.map(movement => (
                        <Tr key={movement.id}>
                            <Td isNumeric>{movement.id}</Td>
                            <Td isNumeric>{movement.user.name}</Td>
                            <Td>
                                {movement.type}{" "}
                                {movement.type === 'entrada' ? (
                                    <ChevronUpIcon color="green" />
                                ) : (
                                    <ChevronDownIcon color="red" />
                                )}
                            </Td>
                            <Td>{movement.date}</Td>
                            <Td isNumeric>{movement.quantity}</Td>
                            <Td isNumeric color={movement.balance <= movement.product.minimum_value ? "red" : movement.balance <= movement.product.minimum_value + 5 ? "orange" : "green"}>
                                {movement.balance}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}