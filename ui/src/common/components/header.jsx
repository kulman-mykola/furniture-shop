import { Badge, Box, Flex, Heading, IconButton } from '@chakra-ui/react';
import { FaHome, FaShoppingBag, FaShoppingCart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useCart } from '../../contexts/cart.context.jsx';
import { Cart } from './cart.jsx';
import { Link, useLocation } from 'react-router-dom';
import ReactLogo from '../../assets/logo.svg?react';

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
            // borderBottom="1px solid"
            borderColor="gray.200"
        >
            <Heading color={color} width={200} as="h1" size="lg">
                <ReactLogo fill={color}/>
            </Heading>

            <Flex align="center" gap="60px">
                <Link to={'/'}>
                    <IconButton
                        variant={'unstyled'}
                        color={color}
                        aria-label="Go to Home"
                        icon={<FaHome  size={36} />}
                    />
                </Link>
                <Link to={'/products'}>
                    <IconButton
                        variant={'unstyled'}
                        color={color}
                        aria-label="Open Shopping Cart"
                        icon={<FaShoppingBag size={36} />}
                    />
                </Link>
            </Flex>

            <Box display={'flex'} width={200} position="relative" justifyContent={'end'}>
                <IconButton aria-label="Cart" icon={<FaShoppingCart />} onClick={handleOpenCart} />
                {cartItems.length > 0 && (
                    <Badge colorScheme="green" position="absolute" top="-1" right="-1" borderRadius="full" px="2">
                        {cartItems.length}
                    </Badge>
                )}
            </Box>
            <Cart isOpen={isCartOpen} onClose={handleCloseCart}></Cart>
        </Flex>
    );
};