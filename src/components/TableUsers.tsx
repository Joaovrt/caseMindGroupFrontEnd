"use client";

import React, { useState } from 'react';
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
    Link,
    useToast
} from '@chakra-ui/react';
import { getCookie } from 'cookies-next';
import Alert from './Alert';

interface TableUsersProps {
    label: string;
    users: User[];
}

export default function TableUsers({ label, users }: TableUsersProps) {
    const toast = useToast();
    const [userToToggle, setUserToToggle] = useState<User | null>(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    async function ableDisableUser(user: User) {
        try {
            const token = getCookie('access_token');
            if (!token) {
                throw new Error('Token de autenticação não encontrado.');
            }
    
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
                if(response.status === 409){
                    toast({
                        title: 'Erro ao desativar usuário',
                        description: 'Não é possível inativar a si mesmo.',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                }
                else
                    throw new Error('Failed to update user status');
                return;
            }
    
            const result = await response.json();
            console.log('User updated successfully:', result);
            toast({
                title: 'Sucesso',
                description: `O usuário foi ${user.active ? 'desativado' : 'ativado'} com sucesso.`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
    
            window.location.href = '/users/all';
        } catch (error) {
            console.error('Error:', error);
            toast({
                title: 'Erro',
                description: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    }

    const handleToggleConfirmation = (user: User) => {
        setUserToToggle(user);
        setIsAlertOpen(true);
    };

    const handleCancel = () => {
        setIsAlertOpen(false);
        setUserToToggle(null);
    };

    const handleConfirm = () => {
        setIsAlertOpen(false);
        if (userToToggle) {
            ableDisableUser(userToToggle);
        }
        setUserToToggle(null);
    };

    return (
        <>
            <Alert
                isOpen={isAlertOpen}
                onClose={handleCancel}
                onConfirm={handleConfirm}
            />
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
                                <Td color={user.active ? 'green' : 'red'}>{user.active ? 'Ativo' : 'Inativo'}</Td>
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
                                    <Button colorScheme={user.active ? 'red' : 'green'} onClick={() => handleToggleConfirmation(user)}>
                                        {user.active ? 'Desabilitar' : 'Ativar'}
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}
