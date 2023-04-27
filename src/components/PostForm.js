import React, { useState } from 'react'
import {
    Box,
    FormControl,
    Input,
    Stack,
    Button
   
} from '@chakra-ui/react';

const PostForm = (props) => {

    const [text, setText] = useState('') //amrazena texto digitado no post

    const onChangeText = (event) => {  //função atualiza o post
        console.log(event.target.value)
        setText(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("post enviado uhul")
        props.onPost(text)
        setText("")
    }
    return (
        <form onSubmit={handleSubmit}>
            <Box spacing={2} margin={'2px'} borderRadius={'12px'} bg={'#EDEDED'} height={'131px'} marginTop={'30px'} >
                <FormControl id="new-post" >
                    <Input type="text" value={text} onChange={onChangeText} name="nickname" placeholder='Escreva seu post...' autoComplete='off' fontSize={'18px'} />
                </FormControl>
            </Box>

            <Stack spacing={2} margin={'2px'} marginTop={'12px'}>
                <Button type="submit" bg={'#ff7141'} color={'white'} borderRadius={'12px'} fontSize={'18px'} >
                    Postar 
                </Button>
            </Stack>
        </form>
    )
}

export default PostForm