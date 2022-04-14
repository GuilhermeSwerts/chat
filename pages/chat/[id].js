import { Flex, Heading } from "@chakra-ui/layout"
import Slider from "../../components/SlideBar"
import { Avatar } from '@chakra-ui/avatar'
import { Input, Button, Text, ChakraProvider } from '@chakra-ui/react'
import { AiFillCaretRight } from "react-icons/ai";

import { useDocumentData, useCollectionData } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';

import { collection, doc, addDoc, deleteDoc, deleteField, query, orderBy, serverTimestamp } from '@firebase/firestore'
import { db } from "../../components/api";
import { auth } from "../../components/api";

import { useRouter } from "next/router";

import getOtherEmail from '../../util/getItherEmail'

import { useState } from 'react'

import { BsFillTrashFill, BsRecycle } from "react-icons/bs";

import getDataNow from '../../util/getDataNow'

const TopBar = ({ email, id }) => {
    const DeleteDoc = async () => {
        await deleteDoc(doc(db, "chats", id), {
            messages: deleteField()
        })
        const chat = document.getElementById('msgScreen')
        chat.remove()
    }

    return <Flex
        bg={'gray.100'}
        h={'81px'} w={'100%'}
        align='center'
        borderBottom={'1px solid'} borderColor={'gray.200'}
        p={3}
    >
        <Flex flex={3}>
            <Avatar src="" marginEnd={3} />
            <Heading size='lg'>{email}</Heading>
        </Flex>
        <Flex flex={1}>
            <Button onClick={DeleteDoc} bg='red.300' cursor='pointer'>Excluir Conversa_<BsFillTrashFill /></Button>
        </Flex>
    </Flex>
}

const BottomBar = ({ id, user }) => {
    const [input, setInput] = useState("")
    const sendMessage = async e => {
        e.preventDefault();
        await addDoc(collection(db, `chats/${id}/messages`), {
            text: input,
            sender: user.email,
            timestamp: serverTimestamp(),
            data: getDataNow()
        })
        setInput("")
    }
    return <Flex h='81px' w={'100%'} p={3} borderTop={'1px solid'} borderColor={'gray.200'}>
        <Input id='inputEscrever' h={'50px'} autoComplete='off' placeholder='Digia sua mensagem...' onChange={e => setInput(e.target.value)} value={input} />
        <Button h={'50px'} type='submit' cursor='pointer' bg='blue.200' onClick={sendMessage} >Enviar <AiFillCaretRight size={30} /></Button>

    </Flex>
}

export default function Chat() {
    const router = useRouter();
    debugger
    let { id } = router.query
    id = id === undefined ? id = 'jwhfbwjefkjlwefwe' : id
    const [user] = useAuthState(auth)

    const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"))
    const [messages] = useCollectionData(q)

    const [chat] = useDocumentData(doc(db, "chats", id))

    return (<ChakraProvider>
        <Flex h="100vh"
        >
            <Slider />

            <Flex

                flex={1}
                direction="column"
            >
                <TopBar email={getOtherEmail(chat?.users, user)} id={id} />

                <Flex flex={1} direction="column" pt={4} mx={5} overflow='scroll' sx={{ scrollbarWidth: 'none' }}>{
                    <Flex id='msgScreen' direction="column">
                        {
                            messages?.map(msg => {
                                const sender = msg.sender === user.email
                                return (<>
                                    <Flex key={Math.random()} alignSelf={sender ? 'flex-end' : 'flex-start'} bg={sender ? 'blue.200' : 'green.200'} w='fit-content' minWidth='100px' borderRadius={sender ? '10px 25px 0px 10px' : '25px 10px 10px 0px'} p={3} m={1}>
                                        <Text wordBreak='break-word' w='200px' >{msg.text}</Text>
                                    </Flex>
                                        <Text fontSize={10}  alignSelf={sender ? 'flex-end' : 'flex-start'} >{msg.data}</Text>
                                </>
                                )
                            })
                        }
                    </Flex>
                }</Flex>

                <BottomBar id={id} user={user} />
            </Flex>
        </Flex>
    </ChakraProvider>
    )
}