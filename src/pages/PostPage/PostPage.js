import {
    Flex,
    Box,
    FormControl,
    Text,
    Input,
    Stack,
    Button,
    Image,
    Link
} from '@chakra-ui/react';
import group from "../../icons/group.png"
import setaparacima from "../../icons/setaparacima.png"
import setaparabaixo from "../../icons/setaparabaixo.png"
import coment from "../../icons/coment.png"
import { useNavigate, useParams } from 'react-router-dom';
import { goToLoginPage, goToPostPage } from '../../routes/coordinator';
import Header from '../../components/Header';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BASE_URL } from '../../constants/BASE_URL';

export const PostPage = (props) => {
    const params = useParams()
    const navigate = useNavigate()
    const [detailsPost, setDetailsPost] = useState([{}])  //estado so para armazenar detalhe do post e colocar em tela 
    const [text, setText] = useState('') // estado para atualizar o que é digitado pelo usuario
    const [commentPost, setCommentPost] = useState([])

    const onChangeText = (event) => {  //função atualiza o post ao digitar
        setText(event.target.value)
    }

    const getDetailsPost = async () => {   //requisição para buscar o post pelo ID e ser exibido na tela.
        try {
            const config = {
                headers: {
                    Authorization: window.localStorage.getItem("token-labeddit")
                }
            }
            const response = await axios.get(`${BASE_URL}/posts/${params.id}`, config)
            setDetailsPost(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitResponse = async (event) => {   // função que grava na API os novos comentarios/responses feitos pelo usuarios!!.
        event.preventDefault()
        try {
            const body = {
                content: text
            }
            const response = await axios.post(
                `${BASE_URL}/posts/${params.id}/comments`, body
            )
            window.localStorage.setItem("token-labeddit", response.data.token)
            getComments()
            setText('') // limpa o input

        } catch (error) {
            console.log(error)
            window.alert("Erro ao realizar post")
        }
    }

    const getComments = async () => {    //função que faz a requisição dos commentarios feitos no post e atualiza array final de exibição (que vai ser exibido abaixo do botao response)
        try {
            const config = {
                headers: {
                    Authorization: window.localStorage.getItem("token-labeddit")
                }
            }
            const response = await axios.get(`${BASE_URL}/posts/${params.id}/comments`, config)
            setCommentPost(response.data)
            getDetailsPost()
        } catch (error) {
            console.log(error)
        }
    }

    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);

    const addLikes = async () => {
        // faz a requisição para dar like
        try {
            const config = {
                headers: {
                    Authorization: window.localStorage.getItem("token-labeddit")
                }
            }
            const response = await axios.put(`${BASE_URL}/posts/${params.id}/like`, config)
            setLike(true)
            getDetailsPost()
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const addDislikes = async () => {
        // faz a requisição para dar dislike
        try {
            const config = {
                headers: {
                    Authorization: window.localStorage.getItem("token-labeddit")
                }
            }
            const response = await axios.put(`${BASE_URL}/posts/${params.id}/dislike`, config)
            setDislike(true)
            getDetailsPost()
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const logout = () => {
        window.localStorage.removeItem("token-labeddit")
        goToLoginPage(navigate)
    }

    useEffect(() => {
        getDetailsPost()
        getComments()
    }, [])

    return (
        <>
            {/* {params.id} */}
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
                                > Logout</Link>
                            </Stack>
                        </Stack>
                        <Box spacing={2} margin={'2px'} marginTop={'26px'} bg={'#FBFBFB'} borderRadius={'12px'} border={'1px solid #E0E0E0'} maxH={'200px'}>
                            <Text color={'#6F6F6F'} fontFamily={'IBM Plex Sans'} fontWeight={'400'} fontSize={'12px'} margin={'9px'}> Enviado por: {detailsPost[0].creator_id} </Text>

                            <Text color={'#000000'} fontSize={'18px'} margin={'9px'} lineHeight={'23.4px'} cursor={'pointer'}>{detailsPost[0].content} </Text>

                            <Stack flexDirection={'row'} gap={'5px'} margin={'10px 2px'}>
                                <Stack padding={'1.5'} margin={'2'} borderRadius={'12px'} border={'1px solid #E0E0E0'} width={'100px'} height={'35px'} align={'center'} gap={'10px'} flexDirection={'row'} >
                                    <Image src={setaparacima} width={'18px'} cursor={'pointer'} onClick={addLikes}/>
                                    <Text fontSize={'9.8px'} color={'#6F6F6F'} >{detailsPost[0].likes}</Text>
                                    <Image src={setaparabaixo} width={'18px'} cursor={'pointer'} onClick={addDislikes}/>
                                    <Text fontSize={'9.8px'} color={'#6F6F6F'} >{detailsPost[0].dislikes}</Text>

                                </Stack>

                                <Stack padding={'1.5'} margin={'2'} borderRadius={'12px'} border={'1px solid #E0E0E0'} width={'100px'} height={'35px'} flexDirection={'row'} align={'center'} gap={'10px'} >
                                    <Image src={coment} width={'18px'} marginLeft={'15px'} cursor={'pointer'} />
                                    <Text fontSize={'9.8px'} color={'#6F6F6F'}>{detailsPost[0].comments}</Text>
                                </Stack>
                            </Stack>
                        </Box>


                        <form onSubmit={handleSubmitResponse}>
                            <Box spacing={2} margin={'2px'} borderRadius={'12px'} bg={'#EDEDED'} height={'131px'} marginTop={'30px'} >
                                <FormControl id="new-post" >
                                    <Input type="content" value={text} onChange={onChangeText} name="content" placeholder='Adicione um comentário' autoComplete='off' fontSize={'18px'} />
                                </FormControl>
                            </Box>

                            <Stack spacing={2} margin={'2px'} marginTop={'12px'}>
                                <Button type="submit" bg={'#ff7141'} color={'white'} borderRadius={'12px'} fontSize={'18px'} onClick={handleSubmitResponse}>
                                    Comentar
                                </Button>
                            </Stack>
                        </form>
                        <Text align={'center'} color={'#FF6489'}> ____________________________________________ </Text>

                        {commentPost && commentPost.map((post, index) => (
                            <Box onClick={() => goToPostPage(navigate, post.id)} key={index} spacing={2} margin={'2px'} marginTop={'26px'} bg={'#FBFBFB'} borderRadius={'12px'} border={'1px solid #E0E0E0'} maxH={'200px'}>
                                <Text color={'#6F6F6F'} fontFamily={'IBM Plex Sans'} fontWeight={'400'} fontSize={'12px'} margin={'9px'}> Enviado por: {post.creator_id} </Text>

                                <Text color={'#000000'} fontSize={'18px'} margin={'9px'} lineHeight={'23.4px'} cursor={'pointer'}>{post.content}</Text>

                                <Stack flexDirection={'row'} gap={'5px'} margin={'10px 2px'}>
                                    <Stack padding={'1.5'} margin={'2'} borderRadius={'12px'} border={'1px solid #E0E0E0'} width={'100px'} height={'35px'} align={'center'} gap={'10px'} flexDirection={'row'} >
                                        <Image src={setaparacima} width={'18px'} cursor={'pointer'} />
                                        <Text fontSize={'9.8px'} color={'#6F6F6F'} >{post.likes}</Text>
                                        <Image src={setaparabaixo} width={'18px'} cursor={'pointer'} />
                                    </Stack>

                                </Stack>
                            </Box>
                        ))}
                    </Box>
                </Stack>
            </Flex>
        </>
    );
}