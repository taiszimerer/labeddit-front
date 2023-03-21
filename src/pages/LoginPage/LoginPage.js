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
import { useState } from 'react';
import { BASE_URL } from '../../constants/BASE_URL';
import { useNavigate } from 'react-router-dom';
import { goToFeedPage, goToSignupPage } from '../../routes/coordinator';
// import { GlobalContext } from '../../contexts/GlobalContext';
import Header from '../../components/Header';


export const LoginPage = () => {

    // const context = useContext(GlobalContext)
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
    //     // if (context.isAuth) {
    //         goToFeedPage(navigate)
    //     // }
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
                <Stack spacing={8} maxW={'100vw'} py={12} px={6}>
                    <Box rounded={'lg'} bg={'#FFFFFF'} p={8} align={'center'}>
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
                                <Input
                                    type="email"
                                    placeholder='E-mail'
                                    onChange={onChangeForm}
                                    name="email" />
                            </FormControl>
                            <FormControl id="password">
                                <Input
                                    type="password"
                                    placeholder='Senha'
                                    onChange={onChangeForm}
                                    name="password" />
                            </FormControl>
                            <Stack spacing={3}>
                                <Button bg={'#FF6489'} color={'white'} borderRadius={'20px'} marginTop={'30px'}
                                    onClick={login}>
                                    {isLoading ? <Spinner /> : "Continuar"}
                                </Button>
                                <Button bg={'#F9B24E'} color={'white'} borderRadius={'20px'} fontSize={'18px'}
                                    onClick={() => goToSignupPage(navigate)}>
                                    Crie uma Conta!
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
            </>
    );
}