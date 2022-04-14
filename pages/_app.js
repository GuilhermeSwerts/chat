

import { useAuthState } from 'react-firebase-hooks/auth'
import { ChakraProvider, Spinner, Center, Text } from '@chakra-ui/react'

import Login from '../pages/index'
import Chat from '../pages/chat/[id]'
import SlideBar from '../components/SlideBar'

import { auth } from '../components/api'

import App from '../components/App'

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth)

  if (loading) {
    <ChakraProvider>
      <Center h='100vh'>
        <Spinner size='x1'/>
        <Text p={3}>Carregando...</Text>
      </Center>
    </ChakraProvider>
  }

  if (!user) {
    return (
      <ChakraProvider>
        <Login />
      </ChakraProvider>
    )
  }

  return <ChakraProvider>
    <App/>
  </ChakraProvider>
}

export default MyApp
