import React from 'react'

import Login from '../pages/index'
import SlideBar from '../components/SlideBar'

import Chat from '../pages/chat/[id]'

import { ChakraProvider, Spinner, Center, Text } from '@chakra-ui/react'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './api'


function App({ Component, pageProps }) {
    const [user, loading, error] = useAuthState(auth)

    if (loading) {
        return (
            <ChakraProvider>
                <Center h='100vh'>
                    <Spinner />
                    <Text p={3}>Carregando...</Text>
                </Center>
            </ChakraProvider>
        )
    }

    if (!user) {
        return (
            <ChakraProvider>
                <Login/>
            </ChakraProvider>
        )
    }

    return <ChakraProvider>
        <Chat />
    </ChakraProvider>
}

export default App