import {
    Flex,
    Box,
    FormControl,
    Input,
    Stack,
    Button,
    Image,
    Heading,
    Text,
    Link, Checkbox
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
            <Stack spacing={8} maxW={'428px'} py={12} px={6}>
                <Box rounded={'lg'} bg={'#FFFFFF'} p={8} >
                    <Header />
                    <Stack marginLeft={'-32px'} marginTop={'-80px'} bg={'#E5E5E5'} flexDirection={'row'} height={'50px'} width={'400px'} align={'center'}>
                        <Stack >
                            <Image
                                src={group}
                                width={'28.6px'}
                                height={'28px'}
                                marginTop={'10px'}
                                marginLeft={'160px'}
                                alt="icon-labEddit"
                            />
                        </Stack>
                        <Stack>
                            <Link
                                fontSize={'18px'}
                                color={'#4088CB'}
                                fontWeight={'600'}
                                marginLeft={'120px'}
                                marginRight={'10px'}
                                onClick={() => goToLoginPage(navigate)}
                                cursor={'pointer'}
                            > Entrar</Link>
                        </Stack>
                    </Stack>
                    <Heading fontSize={'36px'} margin={'20px -10px 100px'} >Olá, boas vindas ao LabEddit ;)</Heading>
                    <Stack spacing={2} margin={'30px'}>
                        <FormControl id="nickname">
                            <Input type="nickname" placeholder='Apelido' autoComplete='off' />
                        </FormControl>
                        <FormControl id="email">
                            <Input type="email" placeholder='E-mail' autoComplete='off' />
                        </FormControl>
                        <FormControl id="password">
                            <Input type="password" placeholder='Senha' autoComplete='off' />
                        </FormControl>
                    </Stack>
                    <Stack spacing={2} marginTop={'40px'}>
                        <Text fontSize={'14px'} color={'#000000'} marginRight={'-3px'}>
                            Ao continuar, você concorda com o nosso <Link color='#4088CB'>Contrato de usuário</Link> e nossa <Link color='#4088CB'>Politica de Privacidade</Link>
                        </Text>
                        <Text fontSize={'14px'} color={'#000000'}> <Checkbox marginTop={'5px'}> </Checkbox>Eu concordo em receber e-mails sobre coisas legais no LabEddit </Text> 
                    </Stack>
                    <Stack spacing={2} margin={'30px'}>
                        <Button bg={'#ff7141'} color={'white'} borderRadius={'20px'} fontSize={'18px'}
                            onClick={() => goToFeedPage(navigate)}>
                            Cadastrar
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}