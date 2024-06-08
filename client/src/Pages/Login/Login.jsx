import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';

const Login = () => {
  return (
    <Box p={4}>
      <VStack spacing={6} maxW="md" mx="auto">
        <FormControl id="emailOrUsername" isRequired>
          <FormLabel>Email or Username</FormLabel>
          <Input type="text" placeholder="Enter your email or username" />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Enter your password" />
        </FormControl>
        <Button colorScheme="blue">Login</Button>
      </VStack>
    </Box>
  );
};

export default Login;
