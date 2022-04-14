import React from 'react'

import { IoChatboxOutline } from "react-icons/io5";

import { Button, Center, Stack, Box } from '@chakra-ui/react';


import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '../components/api'

import Head from 'next/head'

import { ChakraProvider } from '@chakra-ui/react'

function Login() {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    return (<ChakraProvider>
        <Head><title>Login</title></Head>

        <Center h='100vh'>
            <Stack
                align='center'
                bgColor='blue.500'
                p={16}
                borderRadius={30}
            >
                <Box
                    bgColor={'blue.300'}
                    w='fit-content'
                    p={5}
                    rounded='3x1'
                    boxShadow='md'
                    borderRadius={30}
                >
                    <IoChatboxOutline style={{ fontSize: '100px', color: 'white', transform: 'scaleX(-1)' }} />
                </Box>
                <Button boxShadow='md' onClick={() => signInWithGoogle()} >Clique aqui para entrar</Button>
            </Stack>
        </Center>
    </ChakraProvider>)
}

export default Login