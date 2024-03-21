import { Badge, Box, Flex, Heading, IconButton, } from '@chakra-ui/react';
import { FaHome, FaShoppingBag, FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';
import { useCart } from '../../contexts/cart.context.jsx';
import { Cart } from './cart.jsx';
import { Link, useLocation, useNavigate, useNavigation } from 'react-router-dom';


export const Header = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const nav = useLocation()
    
    const color = nav.pathname === '/' ? '#A9D5DE' : 'black'

    const { items } = useCart()

    const handleOpenCart = () => {
        setIsCartOpen(true);
    };

    const handleCloseCart = () => {
        setIsCartOpen(false);
    };

    return (
        <Flex
            as="header"
            align="center"
            justify="space-between"
            padding="1rem"
            backgroundColor='rgba(255, 255, 255, 0.4)'
            borderBottom="1px solid"
            borderColor="gray.200"
        >
            <Heading color={color} width={200} as="h1" size="lg">
                MyCompany
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
                {items.length > 0 && (
                    <Badge colorScheme="green" position="absolute" top="-1" right="-1" borderRadius="full" px="2">
                        {items.length}
                    </Badge>
                )}
            </Box>
            <Cart isOpen={isCartOpen} onClose={handleCloseCart}></Cart>
        </Flex>
    );
};