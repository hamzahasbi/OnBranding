import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    useColorMode,
    Stack,
    Icon,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FcLike } from 'react-icons/fc';
import { menu, OauthMenu } from '../../config/menu';
import { default as NextLink } from 'next/link';
import { useRouter } from 'next/router';

const NavLink = ({ link, label }) => {
    const router = useRouter();

    return (
        <NextLink href={link} passHref>
            <Link
                px={2}
                py={1}
                rounded={'md'}
                color={router.pathname === link ? 'purple.500' : 'telegram'}
                _hover={{
                    textDecoration: 'none',
                    bg: useColorModeValue('gray.200', 'gray.700'),
                }}
            >
                {label}
            </Link>
        </NextLink>
    );
};

export default function withAction() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    // const connected = false;
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex
                    h={16}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: !isOpen ? 'none' : 'inherit' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>Logo</Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}
                        >
                            {menu.map((item) => (
                                <NavLink key={item.id} {...item} />
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Button
                            variant={'solid'}
                            colorScheme={'teal'}
                            size={'sm'}
                            mr={4}
                            leftIcon={<Icon as={FcLike} />}
                        >
                            Sponsor
                        </Button>

                        <IconButton
                            size={'md'}
                            icon={
                                colorMode === 'light' ? (
                                    <MoonIcon />
                                ) : (
                                    <SunIcon />
                                )
                            }
                            aria-label={'Dark mode'}
                            mr={4}
                            color={'yellow.500'}
                            onClick={toggleColorMode}
                        />
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                            >
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                />
                            </MenuButton>
                            <MenuList>
                                {OauthMenu.map((item) => (
                                    <MenuItem key={item.id}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                                <MenuDivider />
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4}>
                        <Stack as={'nav'} spacing={4}>
                            {menu.map((item) => (
                                <NavLink key={item.id} {...item} />
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}
