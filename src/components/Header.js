import { Flex, Stack, Image } from '@chakra-ui/react'
import React from 'react'
import hour from "../icons/hour.png"
import icons from "../icons/icons.jpg"

const Header = () => {
    return (
        <div>
            <Flex >
                <Stack flexDirection={'row'} maxW={'428px'} py={12} px={-5} align={'center'}>
                    <Stack flexDirection={'row'} marginRight={'230px'}>
                        <Image
                            marginTop={'-55px'}
                            src={hour}
                            width={'7'}
                            height={'3'}
                            alt="icon-hour"
                        />
                    </Stack>
                    <Stack>
                        <Image
                            marginTop={'-65px'}
                            src={icons}
                            width={'70px'}
                            height={'25px'}
                            alt="icon-signal"
                        />
                    </Stack>
                </Stack>
            </Flex>

        </div>
    )
}

export default Header