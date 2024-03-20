import { useCart } from '../../contexts/cart.context.jsx';
import {
    Box,
    Button,
    Heading, IconButton,
    Modal,
    ModalContent,
    ModalOverlay,
    Table,
    Tbody, Td, Tr,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

export const  Cart = ({isOpen, onClose}) => {

    const { items, removeItem } = useCart();

    useEffect(() => {
        return () => {
            console.log(items);
        };
    }, [items]);


    const handleRemoveItem = (item) => {
        removeItem(item);
    };

    return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <Box p="4">
                        <Heading size="md" mb="4">Your Cart</Heading>
                        {items.length === 0 ? (
                            <Box textAlign="center" color="gray.500">Your cart is empty</Box>
                        ) : (
                            <Table variant="simple">
                                <Tbody>
                                    {items.map((item, index) => (
                                        <Tr key={index}>
                                            <Td>{item.name}</Td>
                                            <Td>${item.price}</Td>
                                            <Td>
                                                <IconButton
                                                    aria-label="Delete"
                                                    icon={<FaTrash />}
                                                    colorScheme="red"
                                                    onClick={() => handleRemoveItem(item)}
                                                />
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        )}
                        {items.length > 0 && (
                            <Box mt="4" textAlign="right">
                                <Button colorScheme="blue">Checkout</Button>
                            </Box>
                        )}
                    </Box>
                </ModalContent>
            </Modal>
    );
};
