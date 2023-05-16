import React, { useEffect, useState } from 'react'
import { Stack, Box, FormControl, Input, Button, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../constants/BASE_URL'
import { goToPostPage } from '../routes/coordinator'

const FormComment = () => {
    const [text, setText] = useState('') // estado para atualizar o que é digitado pelo usuario
    const [commentPost, setCommentPost] = useState([])
    const navigate = useNavigate()
    const params = useParams()

    const onChangeText = (event) => {  //função atualiza o post ao digitar
        setText(event.target.value)
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

    useEffect(() => {
        getComments()
    }, [])


    return (
        <>
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
                </Box>
            ))}
        </>
    )

}

export default FormComment



