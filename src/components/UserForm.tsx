"use client";

import { User } from '@/types/user';
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
    Switch,
    useToast,
    CircularProgress,
} from '@chakra-ui/react';
import { getCookie } from 'cookies-next';

interface UserFormProps {
    cadastrar: boolean;
    user?: User;
}

export default function UserForm({ cadastrar, user }: UserFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        active: true,
    });
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                active: user.active || true,
                password: '',
                confirm_password: '',
            });
        }
    }, [user]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>, method: 'POST' | 'PUT') {
        e.preventDefault();
        const { name, email, password, confirm_password, active } = formData;

        if (password !== confirm_password) {
            toast({
                title: 'Erro',
                description: 'As senhas não conferem.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        if (cadastrar && !password) {
            toast({
                title: 'Erro',
                description: 'A senha é obrigatória no cadastro.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);
        try {
            const token = getCookie('access_token');
            if (!token) {
                throw new Error('Token de autenticação não encontrado.');
            }

            const url = method === 'POST'
                ? `${process.env.NEXT_PUBLIC_API_URL}/user`
                : `${process.env.NEXT_PUBLIC_API_URL}/user/${user?.id}`;

            const response = await fetch(url, {
                method,
                body: JSON.stringify({ name, email, password: password || undefined, active }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 400) {
                    toast({
                        title: 'Erro ao criar/editar usuário',
                        description: 'E-mail de usuário já cadastrado.',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                } 
                else if(response.status === 409){
                    toast({
                        title: 'Erro ao editar usuário',
                        description: 'Não é possível inativar a si mesmo.',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                }
                else {
                    throw new Error(method === 'POST' ? 'Erro ao cadastrar usuário' : 'Erro ao editar usuário');
                }
                return;
            }

            toast({
                title: method === 'POST' ? 'Usuário criado' : 'Usuário atualizado',
                description: method === 'POST' ? 'O usuário foi criado com sucesso.' : 'O usuário foi atualizado com sucesso.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            window.location.href = '/users/all';
        } catch (error) {
            console.error(method === 'POST' ? 'Erro ao cadastrar usuário:' : 'Erro ao editar usuário:', error);
            toast({
                title: 'Erro',
                description: method === 'POST' ? 'Erro ao cadastrar usuário' : 'Erro ao editar usuário',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Flex minH={'80vh'} align={'center'} justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>{cadastrar ? 'Cadastrar Usuário' : 'Editar Usuário'}</Heading>
                </Stack>
                <Box rounded={'lg'} boxShadow={'lg'} p={8}>
                    <form onSubmit={(e) => handleSubmit(e, cadastrar ? 'POST' : 'PUT')}>
                        <Stack spacing={4}>
                            <FormControl id="name" isRequired>
                                <FormLabel>Nome</FormLabel>
                                <Input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                            </FormControl>
                            <FormControl id="email" isRequired>
                                <FormLabel>E-mail</FormLabel>
                                <Input type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </FormControl>
                            <FormControl id="password" isRequired={cadastrar}>
                                <FormLabel>{cadastrar ? 'Senha' : 'Nova Senha'}</FormLabel>
                                <Input type="password" name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                            </FormControl>
                            <FormControl id="confirm_password">
                                <FormLabel>Confirmação de senha</FormLabel>
                                <Input type="password" name="confirm_password" value={formData.confirm_password} onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })} />
                            </FormControl>
                            <FormControl id="active">
                                <FormLabel>Ativo?</FormLabel>
                                <Switch id="active" isChecked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} />
                            </FormControl>
                            <Stack spacing={10} align={'center'}>
                                {isLoading ? (
                                    <CircularProgress isIndeterminate color='blue.300' />
                                ) : (
                                    <Button
                                        type="submit"
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                        {cadastrar ? 'Cadastrar' : 'Editar'}
                                    </Button>
                                )}
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
}
