import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
} from '@chakra-ui/react';

const Register = () => {
  return (
    <Box p={4}>
      <VStack spacing={6} maxW="md" mx="auto">
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input type="text" placeholder="Enter your name" />
        </FormControl>
        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input type="text" placeholder="Enter your username" />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Enter your password" />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Enter your email" />
        </FormControl>
        <FormControl id="contact">
          <FormLabel>Contact Number</FormLabel>
          <Input type="tel" placeholder="Enter your contact number" />
        </FormControl>
        <HStack spacing={6} w="100%">
          <FormControl id="college" w="50%" isRequired>
            <FormLabel>College Name</FormLabel>
            <Input type="text" placeholder="Enter your college name" />
          </FormControl>
          <FormControl id="yearOfStudy" w="50%">
            <FormLabel>Year of Study</FormLabel>
            <Input type="number" placeholder="Enter your year of study" />
          </FormControl>
        </HStack>
        <HStack spacing={6} w="100%">
          <FormControl id="course" w="50%">
            <FormLabel>Course</FormLabel>
            <Input type="text" placeholder="Enter your course" />
          </FormControl>
          <FormControl id="department" w="50%">
            <FormLabel>Department</FormLabel>
            <Input type="text" placeholder="Enter your department" />
          </FormControl>
        </HStack>
        <Button colorScheme="blue">Register</Button>
      </VStack>
    </Box>
  );
};

export default Register;
