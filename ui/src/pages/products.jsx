import { Card, CardHeader, CardBody, Heading } from '@chakra-ui/react'
import axios from 'axios'
import { useState, useEffect } from 'react';

export const Products = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
         axios.get('http://localhost:3000/products').then(res => setProducts(res.data))
    }, []);


    return (
        products.map(product => (
            <Card>
                <CardHeader>
                    <Heading size='md'>Client Report</Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Summary
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                View a summary of all your clients over the last month.
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Overview
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                Check out the overview of your clients.
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Analysis
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                See a detailed analysis of all your business clients.
                            </Text>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        ))
    );
};
