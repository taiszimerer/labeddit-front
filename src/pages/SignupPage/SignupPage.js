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
    Link,
    Spinner,
    Checkbox
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

    const [isLoading, setIsLoading] = useState(false)

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeForm = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    // useEffect(() => {
    //     // if (context.isAuth) {
    //         goToFeedPage(navigate)
    //     // }
    // })

    const signup = async () => {
        try {
            setIsLoading(true)
            const body = {
                name: form.name,
                email: form.email,
                password: form.password
            }

            const response = await axios.post(
                `${BASE_URL}/users/signup`, body
            )

            window.localStorage.setItem("token-labeddit", response.data.token)
            window.alert("Cadastro realizado com sucesso!")
            setIsLoading(false)
            // context.setIsAuth(true)
            goToFeedPage(navigate)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            window.alert("Erro ao realizar cadastro")
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
                            <Input type="text" name="name" placeholder='Apelido' autoComplete='off' value={form.name} onChange={onChangeForm} />
                        </FormControl>
                        <FormControl id="email">
                            <Input type="text" name="email" placeholder='E-mail' autoComplete='off' value={form.email} onChange={onChangeForm} />
                        </FormControl>
                        <FormControl id="password">
                            <Input type="password" name="password" placeholder='Senha' autoComplete='off' value={form.password} onChange={onChangeForm} />
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
                            onClick={signup}>
                            {isLoading ? <Spinner /> : "Cadastrar"}
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}