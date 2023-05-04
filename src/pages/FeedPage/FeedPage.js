import {
    Flex,
    Box,
    Text,
    Stack,
    Image,
    Link,
    FormControl,
    Input,
    Button
} from '@chakra-ui/react';
import group from "../../icons/group.png"
import setaparacima from "../../icons/setaparacima.png"
import setaparabaixo from "../../icons/setaparabaixo.png"
import coment from "../../icons/coment.png"
import { useNavigate } from 'react-router-dom';
import { goToLoginPage, goToPostPage } from '../../routes/coordinator';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import { BASE_URL } from "../../constants/BASE_URL"
import axios from 'axios';

export const FeedPage = () => {
    const navigate = useNavigate()
    const [text, setText] = useState('') //armazena texto digitado no post
    const [posts, setPosts] = useState([]) //armazena pagina de posts (inicialmente vazia)

    const onChangeText = (event) => {  //função atualiza o post ao digitar
        console.log(event.target.value)
        setText(event.target.value)
    }

    const getPosts = async () => {    //função que faz a requisição e atualiza array posts
        try {
            const config = {
                headers: {
                    Authorization: window.localStorage.getItem("token-labeddit")
                }
            }
            const response = await axios.get(`${BASE_URL}/posts`, config)
            setPosts(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitPost = async () => {   // função que grava na API os novos posts feitos.
        try {
            const body = {
                content: text
            }
            const response = await axios.post(
                `${BASE_URL}/posts`, body
            )
            window.localStorage.setItem("token-labeddit", response.data.token)
        } catch (error) {
            console.log(error)
            window.alert("Erro ao realizar post")
        }
    }

    const logout = () => {       //função para sair da aplicação
        window.localStorage.removeItem("token-labeddit")
        goToLoginPage(navigate)
    }

    useEffect(() => {       //função que só aceita entrada no feed se tiver login realizado!
        const token = window.localStorage.getItem("token-labeddit")
        if (!token) {
            goToLoginPage(navigate)
        }
    }, [])

    useEffect(() => {    // efeito colateral para renderização de posts. Necessario MAP também :)
        getPosts()
    }, [])

    console.log(posts)

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
                                onClick={logout}
                                cursor={'pointer'}
                            > Logout </Link>
                        </Stack>
                    </Stack>

                    <form onSubmit={handleSubmitPost}>
                        <Box spacing={2} margin={'2px'} borderRadius={'12px'} bg={'#EDEDED'} height={'131px'} marginTop={'30px'} >
                            <FormControl id="new-post" >
                                <Input type="content" value={text} onChange={onChangeText} name="content" placeholder='Escreva seu post...' autoComplete='off' fontSize={'18px'} />
                            </FormControl>
                        </Box>

                        <Stack spacing={2} margin={'2px'} marginTop={'12px'}>
                            <Button type="submit" bg={'#ff7141'} color={'white'} borderRadius={'12px'} fontSize={'18px'}>
                                Postar
                            </Button>
                        </Stack>
                    </form>
                    <Text align={'center'} color={'#FF6489'}> ____________________________________________ </Text>

                    {posts && posts.map((post, index) => (
                        <Box onClick={() => goToPostPage(navigate, post.id)} key={index} spacing={2} margin={'2px'} marginTop={'26px'} bg={'#FBFBFB'} borderRadius={'12px'} border={'1px solid #E0E0E0'} maxH={'200px'}>
                            <Text color={'#6F6F6F'} fontFamily={'IBM Plex Sans'} fontWeight={'400'} fontSize={'12px'} margin={'9px'}> Enviado por: {post.creator_id} </Text>

                            <Text color={'#000000'} fontSize={'18px'} margin={'9px'} lineHeight={'23.4px'} cursor={'pointer'}>{post.content}</Text>

                            <Stack flexDirection={'row'} gap={'5px'} margin={'10px 2px'}>
                                <Stack padding={'1.5'} margin={'2'} borderRadius={'12px'} border={'1px solid #E0E0E0'} width={'100px'} height={'35px'} align={'center'} gap={'10px'} flexDirection={'row'} >
                                    <Image src={setaparacima} width={'18px'} cursor={'pointer'} />
                                    <Text fontSize={'9.8px'} color={'#6F6F6F'} >{post.likes}</Text>
                                    <Image src={setaparabaixo} width={'18px'} cursor={'pointer'} />
                                </Stack>

                                <Stack padding={'1.5'} margin={'2'} borderRadius={'12px'} border={'1px solid #E0E0E0'} width={'100px'} height={'35px'} flexDirection={'row'} align={'center'} gap={'10px'} >
                                    <Image src={coment} width={'18px'} marginLeft={'15px'} cursor={'pointer'} />
                                    <Text fontSize={'9.8px'} color={'#6F6F6F'}>{post.comments}</Text>
                                </Stack>
                            </Stack>
                        </Box>
                    ))}
                </Box>
            </Stack>
        </Flex>
    );
}