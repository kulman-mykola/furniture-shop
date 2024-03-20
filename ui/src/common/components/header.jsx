import { Badge, Box, Flex, Heading, IconButton } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';
import { useCart } from '../../contexts/cart.context.jsx';
import { Cart } from './cart.jsx';

export const Header = () => {

    const [isCartOpen, setIsCartOpen] = useState(false);

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
            borderBottom="1px solid"
            borderColor="gray.200"
        >
            {/* Company Name */}
            <Heading as="h1" size="lg">
                MyCompany
            </Heading>

            {/* Cart Icon */}
            <Box position="relative">
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