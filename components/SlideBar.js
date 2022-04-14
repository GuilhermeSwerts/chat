import { Flex, Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { IconButton } from '@chakra-ui/react'
import { IoExitOutline } from "react-icons/io5";

import { signOut } from 'firebase/auth';
import { auth } from './api';

import getOtherEmail from '../util/getItherEmail'

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, addDoc } from '@firebase/firestore'
import { db } from '../components/api'

import { BsFillTrashFill } from "react-icons/bs";

import {deleteDoc,doc} from '@firebase/firestore'

export default function SlideBar() {

    const newChat = async () => {
        const input = prompt("Insira o email para iniciar uma nova conversa.")
        if (!chatExists(input) && (input !== user.email)) await addDoc(collection(db, "chats"), { users: [user.email, input] });
    }

    const redirect = id => {
        debugger
        window.location.href = `/#/chat/${id}`
    }

    const chatExists = email => Chats?.find(chat => (chat.users.includes(user.email) && chat.users.includes(email)))

    const [user] = useAuthState(auth)
    const [snapshot, loading, error] = useCollection(collection(db, "chats"))

    const Chats = snapshot?.docs.map(x => ({ id: x.id, ...x.data() }))

    const ChatList = () => {

        return (
            Chats?.map(
                chat => <Flex key={Math.random()}>
                    <Flex w='100%' p={3} align="center" _hover={{ bg: 'gray.100', cursor: 'pointer' }} onClick={() => redirect(chat.id)}>
                        <Avatar src="" marginEnd={3} />
                        <Text>{getOtherEmail(chat.users, user)}</Text>
                    </Flex>
                </Flex>
            )
        )
    }

    return (
        <Flex // bg={'blue.100'}
            w={'300px'} h={'100vh'}
            borderEnd={'1px solid'} borderColor={'gray.200'}
            direction={'column'}
        >

            <Flex //bg={'red.100'}
                h={'81px'} w={'100%'}
                align={'center'}
                justifyContent={'space-between'}
                borderBottom={'1px solid'} borderColor={'gray.200'}
                padding={3}
                >

                <Flex align={'center'} >
                    <Avatar src={user.photoURL} marginEnd={3} />
                    <Text>{user.displayName}</Text>
                </Flex>
                <IconButton size="sm" isRound icon={<IoExitOutline />} onClick={() => signOut(auth)} />
            </Flex>

            <Button m={5} p={5} onClick={() => newChat()}>Nova Conversa</Button>

            <Flex direction={'column'} overflow='hidden'>
                <ChatList />
            </Flex>

        </Flex>
    )
}