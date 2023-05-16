import {
    Flex,
    Box,
    Text,
    Stack,
    Image
} from '@chakra-ui/react';
import setaparacima from "../../icons/setaparacima.png"
import setaparabaixo from "../../icons/setaparabaixo.png"
import coment from "../../icons/coment.png"
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Logout from '../../components/Logout';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BASE_URL } from '../../constants/BASE_URL';
import FormComment from '../../components/FormComment';

export const PostPage = (props) => {
    const params = useParams()
    const [detailsPost, setDetailsPost] = useState([{}])  //estado so para armazenar detalhe do post e colocar em tela 
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);

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

    useEffect(() => {
        getDetailsPost()
    }, [])

    return (
        <>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={'#E5E5E5'}>
                <Stack spacing={8} maxW={'428px'} py={12} px={6}>
                    <Box rounded={'lg'} bg={'#FFFFFF'} p={8} >
                        <Header />
                        <Logout/>
     
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
                        <FormComment/>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
}