import { useState } from 'react';
import { Input, Button, FormControl, FormLabel, FormHelperText, Box } from '@chakra-ui/react';
import axios from 'axios';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);
        await axios.post('http://localhost:3000/auth/login', {email: email, password: password}).then(res => {
            localStorage.setItem('token', res.data.access_token)
            }
        )
    };

    return (
        <Box maxW="md" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg">
            <form onSubmit={handleSubmit}>
                <FormControl id="email" isInvalid={errors.email}>
                    <FormLabel>Email address</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                    <FormHelperText color="red">{errors.email}</FormHelperText>
                </FormControl>

                <FormControl id="password" mt={4} isInvalid={errors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                    <FormHelperText color="red">{errors.password}</FormHelperText>
                </FormControl>

                <Button type="submit" colorScheme="blue" mt={4} isLoading={false}>
                    Login
                </Button>
            </form>
        </Box>
    );
};

export default Auth;
