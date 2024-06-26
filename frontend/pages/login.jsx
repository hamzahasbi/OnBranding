
import { Flex, Stack, Image } from '@chakra-ui/react';
import LoginForm from '../components/forms/Login';
import { useMediaQuery } from "@chakra-ui/react"

export default function Login() {
    const [isMobile] = useMediaQuery("(max-width: 600px)")

    return (
        <>
            <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
                <Flex p={8} flex={1} align={'center'} justify={'center'}>
                    <LoginForm />
                </Flex>
                <Flex flex={1} > 
                    <Image
                        alt={'Login Image'}
                        objectFit={'cover'}
                        display={isMobile ? 'none' : 'inline'}
                        src={
                            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                        }
                    />
                </Flex>
            </Stack>
        </>
    );
}
