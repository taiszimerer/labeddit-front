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
import axios from 'axios'
import { useContext, useState } from 'react';
import { BASE_URL } from '../../constants/BASE_URL';
import { useNavigate } from 'react-router-dom';
import { goToFeedPage, goToSignupPage } from '../../routes/coordinator';
import { GlobalContext } from '../../contexts/GlobalContext';
import Header from '../../components/Header';


export const LoginPage = () => {
    const context = useContext(GlobalContext)
    console.log(context)
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const onChangeForm = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    // useEffect(() => {
    //     if (context.isAuth) {
    //         goToFeedPage(navigate)
    //     }
    // })

    const login = async () => {
        try {
            setIsLoading(true)
            const body = {
                email: form.email,
                password: form.password
            }

            const response = await axios.post(
                `${BASE_URL}/user/login`, body
            )

            window.localStorage.setItem("token-labeddit", response.data.token)
            window.alert("login realizado com sucesso!")

            setIsLoading(false)
            // context.setIsAuth(true)

            goToFeedPage(navigate)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    return (
        <>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={'#E5E5E5'}>
                <Stack spacing={8} maxW={'428px'} py={12} px={6}>
                    <Box rounded={'lg'} bg={'#FFFFFF'} p={8} align={'center'} width={'380px'} height={'700px'}>
                        <Header />
                        <Stack marginTop={'30px'}>
                            <Image
                                src={group}
                                width={'70px'}
                                height={'50px'}
                                marginLeft={'120px'}
                                alt="icon-labEddit"
                            />
                            <Heading fontSize={'36px'}>LabEddit</Heading>
                            <Text fontSize={'16px'} color={'#000000'} align={'center'}>
                                O projeto de rede Social da Labenu
                            </Text>
                        </Stack>
                        <Stack spacing={2} margin={'30px'}>
                            <FormControl id="email">
                            <Input type="text" name="email" placeholder='E-mail' autoComplete='off'  value={form.email} onChange={onChangeForm}/>
                            </FormControl>
                            <FormControl id="password">
                            <Input type="password"  name="password" placeholder='Senha' autoComplete='off' value={form.password} onChange={onChangeForm} />
                            </FormControl>
                            <Stack spacing={3}>
                                <Button bg={'#FF6489'} color={'white'} borderRadius={'20px'} marginTop={'40px'}
                                    onClick={login}>
                                    {isLoading ? <Spinner /> : "Continuar"}
                                </Button>
                                <Button bg={'#ff7141'} color={'white'} borderRadius={'20px'} fontSize={'18px'}
                                    onClick={() => goToSignupPage(navigate)}>
                                    Crie uma Conta!
                                </Button>
                            </Stack >
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
            </>
    );
}