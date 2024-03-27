import { Badge, Box, Flex, Heading, IconButton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useCart } from '../../contexts/cart.context.jsx';
import { Cart } from './cart.jsx';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import ReactLogo from '../../assets/logo.svg?react';
import { IoCart } from "react-icons/io5";
import { MdStoreMallDirectory } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { RiAccountCircleFill } from "react-icons/ri";
import { ImMenu } from "react-icons/im";
import { useAuth } from '../../contexts/auth.context.jsx';

export const Header = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false)

    const nav = useLocation()

    const { token } = useAuth()

    const navigate = useNavigate()

    const interpolateColor = (red, green, blue, percentage, revert = false) => {
        // Convert percentage to a value between 0 and 1
        const percentageDecimal = percentage / 100;

        let interpolatedRed, interpolatedGreen, interpolatedBlue;

        // Calculate the interpolated color values
        if (revert) {
            interpolatedRed = Math.round((1 - percentageDecimal) * red + percentageDecimal * 255);
            interpolatedGreen = Math.round((1 - percentageDecimal) * green + percentageDecimal * 255);
            interpolatedBlue = Math.round((1 - percentageDecimal) * blue + percentageDecimal * 255);
        } else {
            interpolatedRed = Math.round((1 - percentageDecimal) * 255 + percentageDecimal * red);
            interpolatedGreen = Math.round((1 - percentageDecimal) * 255 + percentageDecimal * green);
            interpolatedBlue = Math.round((1 - percentageDecimal) * 255 + percentageDecimal * blue);
        }
        return `rgb(${interpolatedRed}, ${interpolatedGreen}, ${interpolatedBlue})`;
    }

    const [scrollPosition, setScrollPosition] = useState(0);

    const color = nav.pathname === '/' ? interpolateColor(51,16,14, scrollPosition) : 'black'

    const textColor = nav.pathname === '/' ? interpolateColor(51,16,14, scrollPosition, true) : 'white'

    const { cartItems } = useCart()

    const handleScroll = () => {
        const scrollPosition = window.scrollY;

        let percentageInRange = (scrollPosition / 300) * 100;

        if (scrollPosition > 300) {
            percentageInRange = 100;
        }

        setScrollPosition(percentageInRange)
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleOpenCart = () => {
        setIsCartOpen(true);
    };

    const handleCloseCart = () => {
        setIsCartOpen(false);
    };

    const getOpacity = () => {
        return `rgba(255, 255, 255, ${scrollPosition / 100})`
    }

    const onProfileClick = () => {
        setMenuOpen(prev => !prev)
        console.log(menuOpen)
    }

    return (
        <Flex
            style={{position: 'fixed', top: 0, left: 0 , width: '100vw'}}
            as="header"
            align="center"
            justify="space-between"
            padding="1rem"
            backgroundColor={getOpacity()}
            borderColor="gray.200"
        >
            <Heading color={color} width={200} as="h1" size="lg">
                <Link to={'/'}>
                    <ReactLogo fill={color}/>
                </Link>
            </Heading>



            <Flex align="center" gap="60px">
                <Link to={'/products'}>
                    <IconButton
                        variant={'unstyled'}
                        color={color}
                        aria-label="Open Shopping Cart"
                        icon={<MdStoreMallDirectory size={36} />}
                    />
                </Link>
            </Flex>

            <Box role={'group'} display={'flex'}
                 style={{ justifyContent: 'end', alignItems: 'center' }} width={200} position="relative" justifyContent={'end'}>

                <Box
                    display="flex"
                    alignItems="center"
                    position="absolute"
                    transition="all 0.4s ease-out"
                    transform={menuOpen ? 'translateX(-540%)' : 'none'}
                >
                    <IconButton
                        disabled={!menuOpen}
                        opacity={menuOpen ? '1' : '0'}
                        display={menuOpen ? 'block' : 'hidden'}
                        zIndex={10}
                        variant="unstyled"
                        color={color}
                        aria-label="Cart"
                        icon={<IoCart size={36} />}
                        onClick={handleOpenCart}
                    />
                    {cartItems.length > 0 && (
                        <Badge
                            backgroundColor={color}
                            boxSizing={'border-box'}
                            clipPath={'revert'}
                            border={`3px solid ${textColor}`}
                            position="absolute"
                            top="-1"
                            zIndex={20}
                            right="-1"
                            borderRadius="100"
                            px="2"
                        >
                            <Box color={textColor}>{cartItems.length}</Box>
                        </Badge>
                    )}
                </Box>

                <IconButton
                    disabled={!menuOpen}
                    style={{
                        opacity: menuOpen ? '1' : '0',
                        position: 'absolute',
                        transition: 'all 0.4s ease-out',
                        transform: menuOpen ? 'translateX(-360%)' : 'none'
                    }}
                    variant={'unstyled'}
                    color={color}
                    aria-label="Open Shopping Cart"
                    icon={<IoSettings size={36} />}
                />

                <IconButton
                    disabled={!menuOpen}
                    variant={'unstyled'}
                    color={color}
                    aria-label="Open Profile"
                    style={{
                        opacity: menuOpen ? '1' : '0',
                        position: 'absolute',
                        transition: 'all 0.4s ease-out',
                        transform: menuOpen ? 'translateX(-180%)' : 'none'
                    }}
                    onClick={() => navigate(token ? '/user' : '/auth')}
                    icon={<RiAccountCircleFill size={36} />}
                />

                <IconButton
                    onClick={() => onProfileClick()}
                    zIndex={menuOpen ? 0 : 10}
                    variant={'unstyled'}
                    color={color}
                    aria-label="Open Menu"
                    icon={<ImMenu size={36} />}
                />
            </Box>

            <Cart isOpen={isCartOpen} onClose={handleCloseCart}></Cart>
        </Flex>
    );
};