import { useCart } from '../../contexts/cart.context.jsx';
import {
    Box,
    Button,
    Text,
    Modal,
    ModalContent,
    ModalOverlay, Input,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

export const  Cart = ({isOpen, onClose}) => {

    const { cartItems, addItem, removeItem, getCartSize, updateQuantity } = useCart()

    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <Box style={{padding: 20}}>
                        <Text fontSize="xl" fontWeight="bold" mb={4}>Cart</Text>
                        {cartItems.length === 0 ? (
                            <Text>Your cart is empty.</Text>
                        ) : (
                            <Box>
                                {cartItems.map(item => (
                                    <Box key={item.id} mb={4} display="flex" alignItems="center" >
                                        <Box flex="1">
                                            <Text>{item.name}</Text>
                                        </Box>
                                        <Box ml={4}>
                                            <Text>Quantity: </Text>
                                            <Input
                                                type="number"
                                                value={item.quantity}
                                                min="1"
                                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                                w="50px"
                                                ml={2}
                                            />
                                        </Box>
                                        <Button onClick={() => removeItem(item.id)} colorScheme="red" size="sm" ml={4}>Remove</Button>
                                    </Box>
                                ))}
                                <Text fontWeight="bold" mt={4}>Total Price: ${totalPrice.toFixed(2)}</Text>

                                <Link to={'/checkout'}>
                                    <Button>Checkout</Button>
                                </Link>
                            </Box>
                        )}
                    </Box>
                </ModalContent>
            </Modal>
    );
};
