import React from 'react'
import { Stack, Image, Link } from '@chakra-ui/react'
import group from '../icons/group.png'
import { goToLoginPage } from '../routes/coordinator';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate()

    const logout = () => {
        window.localStorage.removeItem("token-labeddit")
        goToLoginPage(navigate)
    }

    return (
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
    )
}

export default Logout