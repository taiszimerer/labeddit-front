import {
    Flex,
    Box,
    FormControl,
    Input,
    Stack,
    Button,
    Heading,
    Text, 
    Image
} from '@chakra-ui/react';
import group from "../../icons/group.png"
import { useState } from 'react';

export const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const login = () => {
        console.log(email)
        console.log(password)
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={'#E5E5E5'}>
            <Stack spacing={8} maxW={'lg'} py={12} px={6}>
                <Box rounded={'lg'} bg={'#FFFFFF'} p={8} align={'center'}>
                    <Stack marginTop={'30px'}>
                        <Image
                            src={group}
                            width={'70px'}
                            height={'50px'}
                            marginLeft={'110px'}
                            alt="icon-labEddit"
                        />
                        <Heading fontSize={'36px'}>LabEddit</Heading>
                        <Text fontSize={'16px'} color={'#000000'} align={'center'}>
                            O projeto de rede Social da Labenu
                        </Text>
                    </Stack>
                    <Stack spacing={2} margin={'50px'}>
                        <FormControl id="email">
                            <Input type="email" placeholder='E-mail' onChangeEmail={onChangeEmail} />
                        </FormControl>
                        <FormControl id="password">
                            <Input type="password" placeholder='Senha' onChangePassword={onChangePassword}/>
                        </FormControl>
                        <Stack spacing={3}>
                            <Button bg={'#FF6489'} color={'white'} borderRadius={'20px'} marginTop={'30px'} onClick={login}>
                                Continuar
                            </Button>
                            <Button bg={'#F9B24E'} color={'white'} borderRadius={'20px'} fontSize={'18px'} >
                                Crie uma Conta!
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}