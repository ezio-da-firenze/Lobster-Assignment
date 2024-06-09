import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  color,
} from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const Login = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/auth/login',
        formData,
        { withCredentials: true }
      );

      console.log('Login successful:', response.data);

      toast({
        title: 'Login Successful',
        description: 'You have successfully logged in.',
        position: 'top',
        status: 'info',
        duration: 1000,
        isClosable: true,
      });

      setTimeout(() => {
        window.location.href = '/events';
      }, 1200);
    } catch (error) {
      console.error('Error logging in:', error);
      toast({
        title: 'Error',
        description: 'Failed to log in. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={6} maxW="md" mx="auto">
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Login
        </Button>
        {/* Additional line with Link to registration page */}
        <Text>
          Don't have an account?{' '}
          <Link
            to="/register"
            style={{
              fontWeight: 'bold',
              color: '#3182ce',
              textDecoration: 'underline',
            }}
          >
            Register
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default Login;
