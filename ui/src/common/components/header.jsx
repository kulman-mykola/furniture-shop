import { Badge, Box, Flex, Heading, IconButton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useCart } from '../../contexts/cart.context.jsx';
import { Cart } from './cart.jsx';
import { Link, useLocation } from 'react-router-dom';
import ReactLogo from '../../assets/logo.svg?react';
import { IoCart } from "react-icons/io5";
import { MdStoreMallDirectory } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { RiAccountCircleFill } from "react-icons/ri";

export const Header = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const nav = useLocation()

    const interpolateColor = (red, green, blue, percentage) => {
        // Convert percentage to a value between 0 and 1
        const percentageDecimal = percentage / 100;

        // Calculate the interpolated color values
        const interpolatedRed = Math.round((1 - percentageDecimal) * 255 + percentageDecimal * red);
        const interpolatedGreen = Math.round((1 - percentageDecimal) * 255 + percentageDecimal * green);
        const interpolatedBlue = Math.round((1 - percentageDecimal) * 255 + percentageDecimal * blue);

        // Return the interpolated color as a CSS rgb string
        return `rgb(${interpolatedRed}, ${interpolatedGreen}, ${interpolatedBlue})`;
    }

    const [scrollPosition, setScrollPosition] = useState(0);

    const color = nav.pathname === '/' ? interpolateColor(51,16,14, scrollPosition) : 'black'

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
                 style={{justifyContent:'end', transition: 'all 0.3s ease-in', transitionDelay: '0.5s',  alignItems: 'center'}} width={200} position="relative" justifyContent={'end'}>
                <IconButton
                    style={{position: 'absolute', opacity: 0.2}}
                    variant={'unstyled'}
                    color={color}
                    aria-label="Cart"
                    icon={<IoCart size={36} />}
                    onClick={handleOpenCart}
                    _groupHover={{transition: 'all 0.3s ease-out', transitionDelay: '0s', transform: 'translateX(-150%)'}}
                />
                {cartItems.length > 0 && (
                    <Badge colorScheme="green" position="absolute" top="-1" right="-1" borderRadius="full" px="2">
                        {cartItems.length}
                    </Badge>
                )}

                <IconButton
                    style={{position: 'absolute', transition: 'all 0.3s ease-out'}}
                    variant={'unstyled'}
                    color={color}
                    aria-label="Open Shopping Cart"
                    icon={<IoSettings size={36} />}
                    _groupHover={{transition: 'all 0.3s ease-out', transform: 'translateY(150%)'}}
                />

                <IconButton
                    variant={'unstyled'}
                    color={color}
                    aria-label="Open Shopping Cart"
                    icon={<RiAccountCircleFill size={36} />}
                />
            </Box>

            <Cart isOpen={isCartOpen} onClose={handleCloseCart}></Cart>
        </Flex>
    );
};