import {
    Card,
    CardBody,
    Heading,
    Box,
    Stack,
    StackDivider,
    Text,
    Button,
    CardHeader,
    CardFooter, SimpleGrid,
} from '@chakra-ui/react';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { useCart } from '../contexts/cart.context.jsx';

export const Products = () => {

    const [products, setProducts] = useState([])

    const {addItem} = useCart()

    useEffect(() => {
         axios.get('http://localhost:3000/products').then(res => setProducts(res.data))
    }, []);

    return (
        <SimpleGrid style={{margin: 60}} spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
            { products.map(product => (
                <Card key={product.id}>
                    <CardHeader>
                        <Heading size="md">{product.name}</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>{product.price}</Text>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={() => addItem(product)}>Add to cart</Button>
                    </CardFooter>
                </Card>
            ))}
        </SimpleGrid>
    );
};
