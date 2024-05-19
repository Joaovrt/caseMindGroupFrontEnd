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
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
        return new Date(dateString).toLocaleString('pt-BR', options);
    };

    return (
        <TableContainer>
            <Table variant='striped'>
                <TableCaption placement="top" fontSize="lg">{label}</TableCaption>
                <Thead>
                    <Tr>
                        <Th isNumeric>Id</Th>
                        <Th>Produto</Th>
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
                            <Td>{movement.product.name}</Td>
                            <Td>{movement.user.name}</Td>
                            <Td>
                                {movement.type}{" "}
                                {movement.type === 'entrada' ? (
                                    <ChevronUpIcon color="green" />
                                ) : (
                                    <ChevronDownIcon color="red" />
                                )}
                            </Td>
                            <Td>{formatDate(movement.date)}</Td>
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