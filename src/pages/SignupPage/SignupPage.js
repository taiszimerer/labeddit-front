import {
    Flex,
    Box,
    FormControl,
    Input,
    Stack,
    Button,
    Image,
    Text,
    Link
} from '@chakra-ui/react';
import group from "../../icons/group.png"
import axios from 'axios'
import { useState } from 'react';
import { BASE_URL } from '../../constants/BASE_URL';
import { useNavigate } from 'react-router-dom';
import { goToFeedPage, goToLoginPage } from '../../routes/coordinator';
import Header from '../../components/Header';

export const SignupPage = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)  //começa false

    const [nickname, setNickName] = useState("")
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
                `${BASE_URL}/user/login`, body
            )

            // window.localStorage.setItem("token-labeddit", response.data.token)
            // window.alert("login realizado com sucesso!")
            goToFeedPage(navigate)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            // setIsLoading(false)
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
                    <Header />
                    <Stack marginTop={'10px'} marginLeft={'-20px'} bg={'#E5E5E5'} flexDirection={'row'} width={'428px'} height={'50px'} align={'center'}>
                        <Stack >
                            <Image
                                src={group}
                                width={'30px'}
                                height={'20px'}
                                marginTop={'10px'}
                                marginLeft={'190px'}
                                alt="icon-labEddit"
                            />
                        </Stack>
                        <Stack>
                            <Link
                                fontSize={'18px'}
                                color={'#4088CB'}
                                fontWeight={'600'}
                                marginLeft={'120px'}
                            > Entrar</Link>
                        </Stack>
                    </Stack>
                    <Stack spacing={2} margin={'50px'}>
                        <FormControl id="nickname">
                            <Input type="nickname" placeholder='Apelido' autoComplete='off' />
                        </FormControl>
                        <FormControl id="email">
                            <Input type="email" placeholder='E-mail' autoComplete='off' />
                        </FormControl>
                        <FormControl id="password">
                            <Input type="password" placeholder='Senha' autoComplete='off' />
                        </FormControl>
                        <Stack spacing={3}>
                            <Text fontSize={'14px'} color={'#000000'} align={'center'} marginTop={'10px'}>
                                Ao continuar, você concorda com o nosso <link color='#4088CB'>Contrato de usuário</link> e nossa <link color='#4088CB'>Politica de Privacidade</link>
                            </Text>
                            <Button bg={'#F9B24E'} color={'white'} borderRadius={'20px'} fontSize={'18px'}
                                onClick={() => goToLoginPage(navigate)}>
                                Cadastrar
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}