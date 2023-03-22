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
import { useNavigate } from 'react-router-dom';
import { goToLoginPage, goToPostPage } from '../../routes/coordinator';
import Header from '../../components/Header';

export const FeedPage = () => {
    const navigate = useNavigate()

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
                            > Logout</Link>
                        </Stack>
                    </Stack>

                    <Stack spacing={2} margin={'2px'} borderRadius={'12px'} bg={'#EDEDED'} height={'131px'} marginTop={'50px'} >
                        <FormControl id="new-post">
                            <Input type="text" name="nickname" placeholder='Escreva seu post...' autoComplete='off' fontSize={'18px'} />
                        </FormControl>
                    </Stack>

                    <Stack spacing={2} margin={'2px'} marginTop={'12px'}>
                        <Button bg={'#ff7141'} color={'white'} borderRadius={'12px'} fontSize={'18px'}>
                            Postar
                        </Button>
                    </Stack>

                    <Text align={'center'} color={'#FF6489'}> _________________________________________ </Text>
                    <Box onClick={() => goToPostPage(navigate)} spacing={2} margin={'2px'} marginTop={'26px'} bg={'#FBFBFB'} borderRadius={'12px'} border={'1px solid #E0E0E0'} maxH={'200px'}>
                        <Text color={'#6F6F6F'} fontFamily={'IBM Plex Sans'} fontWeight={'400'} fontSize={'12px'} margin={'9px'}> Enviado por: margarida03</Text>

                        <Text color={'#000000'} fontSize={'18px'} margin={'9px'} lineHeight={'23.4px'} cursor={'pointer'}>  Por que a maioria dos desenvolvedores usam Linux? ou as empresas de tecnologia usam Linux? </Text>

                        <Stack flexDirection={'row'} gap={'5px'} margin={'10px 2px'}>
                            <Stack padding={'1.5'} margin={'2'} borderRadius={'12px'} border={'1px solid #E0E0E0'} width={'100px'} height={'35px'} align={'center'} gap={'10px'} flexDirection={'row'} >
                                <Image src={setaparacima} width={'18px'} cursor={'pointer'} />
                                <Text fontSize={'9.8px'} color={'#6F6F6F'} >1.2K</Text>
                                <Image src={setaparabaixo} width={'18px'} cursor={'pointer'}/>
                            </Stack>

                            <Stack padding={'1.5'} margin={'2'} borderRadius={'12px'} border={'1px solid #E0E0E0'} width={'100px'} height={'35px'} flexDirection={'row'} align={'center'} gap={'10px'} >
                                <Image src={coment} width={'18px'} marginLeft={'15px'} cursor={'pointer'} />
                                <Text fontSize={'9.8px'} color={'#6F6F6F'}>1.2K</Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
            </Stack>
        </Flex>
    );
}