import {
    Flex,
    Box,
    FormControl,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    Image,
    Spinner
} from '@chakra-ui/react';
import group from "../../icons/group.png"
import hour from "../../icons/hour.png"
import icons from "../../icons/icons.jpg"
import axios from 'axios'

import { useState } from 'react';
import { BASE_URL } from '../../constants/BASE_URL';
import { useNavigate } from 'react-router-dom';
import { goToFeedPage, goToSignupPage } from '../../routes/coordinator';

export const LoginPage = () => {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)  //começa false

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const login = async () => {
        try {
            setIsLoading(true)
            const body = {
                email: email,
                password: password
            }

            const response = await axios.post(
                `${BASE_URL}/users/login`, body
            )

            window.localStorage.setItem("token-labeddit", response.data.token)
            window.alert("login realizado com sucesso!")
            goToFeedPage(navigate)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={'#E5E5E5'}>
            <Stack spacing={8} maxW={'lg'} py={12} px={6}>
                <Box rounded={'lg'} bg={'#FFFFFF'} p={8} align={'center'}>
                    <Stack flexDirection={'row'} >
                        <Stack flexDirection={'row'} marginRight={'190px'} alignItems={'center'}>
                            <Image
                                src={hour}
                                width={'7'}
                                height={'3'}
                                alt="icon-hour"
                            />
                        </Stack>
                        <Stack>
                            <Image
                                src={icons}
                                width={'70px'}
                                height={'25px'}
                                alt="icon-signal"
                            />
                        </Stack>

                    </Stack>
                    <Stack marginTop={'30px'}>
                        <Image
                            src={group}
                            width={'70px'}
                            height={'50px'}
                            marginLeft={'125px'}
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
                            <Input type="password" placeholder='Senha' onChangePassword={onChangePassword} />
                        </FormControl>
                        <Stack spacing={3}>
                            <Button bg={'#FF6489'} color={'white'} borderRadius={'20px'} marginTop={'30px'}
                                onClick={login}>
                                {isLoading ? <Spinner /> : "Continuar"}
                            </Button>
                            <Button bg={'#F9B24E'} color={'white'} borderRadius={'20px'} fontSize={'18px'} 
                            onClick={goToSignupPage(navigate)}>
                                Crie uma Conta!
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}