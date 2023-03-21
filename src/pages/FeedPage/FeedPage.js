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
import { useNavigate } from 'react-router-dom';
import { goToLoginPage } from '../../routes/coordinator';
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

                    <Stack spacing={2} margin={'10px'} borderRadius={'12px'} bg={'#EDEDED'} height={'131px'} marginTop={'50px'} >
                        <FormControl id="new-post">
                            <Input type="text" name="nickname" placeholder='Escreva seu post...' autoComplete='off' fontSize={'18px'}/>
                        </FormControl>
                    </Stack>

                    <Stack spacing={2} margin={'10px'} marginTop={'12px'}>
                        <Button bg={'#ff7141'} color={'white'} borderRadius={'12px'} fontSize={'18px'}>
                            Postar
                        </Button>
                    </Stack>

                    <Text align={'center'} color={'#FF6489'}> _________________________________________ </Text>

                    <Box spacing={2} margin={'10px'} marginTop={'26px'} bg={'#FBFBFB'} borderRadius={'12px'} border={'1px solid #E0E0E0'} height={'167px'}>  </Box>
                </Box>
            </Stack>
        </Flex>
    );
}