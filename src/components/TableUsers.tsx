"use client";

import { User } from '@/types/user';
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
    Link
} from '@chakra-ui/react';
import { getCookie } from 'cookies-next';

interface TableUsersProps {
    label: string;
    users: User[];
}

export default function TableUsers({ label, users }: TableUsersProps) {
    async function ableDisableUser(user: User) {
        try {
          const token = getCookie('access_token');
          if (!token) {
            throw new Error('Token de autenticação não encontrado.');
          }
      
          // Criar um novo objeto de usuário com o campo "active" invertido
          const updatedUser = { ...user, active: !user.active };
      
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${user.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedUser),
          });
      
          if (!response.ok) {
            throw new Error('Failed to update user status');
          }
      
          const result = await response.json();
          console.log('User updated successfully:', result);
          window.location.href = '/users/all';
        } catch (error) {
          console.error('Error:', error);
          throw error;
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
                        <Th>E-mail</Th>
                        <Th>Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map(user => (
                        <Tr key={user.id}>
                            <Td isNumeric>{user.id}</Td>
                            <Td>{user.name}</Td>
                            <Td>{user.email}</Td>
                            <Td color={user.active?'green':'red'}>{user.active? 'Ativo' : 'Inativo'}</Td>
                            <Td isNumeric>
                                <Link
                                _hover={{
                                    textDecoration: 'none'
                                }}
                                href={`/users/user/${user.id}`}>
                                    <Button marginRight={2} colorScheme='blue'>Detalhes</Button>
                                </Link>
                                <Link
                                _hover={{
                                    textDecoration: 'none'
                                }}
                                href={`/users/edit/${user.id}`}>
                                    <Button marginRight={2} colorScheme='yellow'>Editar</Button>
                                </Link>
                                    <Button colorScheme={user.active?'red':'green'} onClick={()=>ableDisableUser(user)}>{user.active?'Desabilitar':'Ativar'}</Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
