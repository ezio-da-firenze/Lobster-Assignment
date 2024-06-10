import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const Register = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    contact: '',
    college: '',
    course: '',
    department: '',
    yearOfStudy: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/auth/register',
        formData
      );

      console.log('Registration successful:', response.data);

      toast({
        title: 'Registration Successful',
        description: 'You have successfully registered.',
        position: 'top',
        status: 'info',
        duration: 1000,
        isClosable: true,
      });

      setFormData({
        name: '',
        username: '',
        password: '',
        email: '',
        contact: '',
        college: '',
        course: '',
        department: '',
        yearOfStudy: '',
      });
      setTimeout(() => {
        window.location.href = '/login';
      }, 1200);
    } catch (error) {
      console.error('Error registering:', error);
      toast({
        title: 'Error',
        description: 'Failed to register. Please try again later.',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Box p={4}>
        <VStack spacing={6} maxW="md" mx="auto">
          {/* Form fields */}
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              name="username"
              value={formData.username}
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
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="contact">
            <FormLabel>Contact Number</FormLabel>
            <Input
              type="tel"
              placeholder="Enter your contact number"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
          </FormControl>
          <HStack spacing={6} w="100%">
            <FormControl id="college" w="50%" isRequired>
              <FormLabel>College Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your college name"
                name="college"
                value={formData.college}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="yearOfStudy" w="50%">
              <FormLabel>Year of Study</FormLabel>
              <Input
                type="number"
                placeholder="Enter your year of study"
                name="yearOfStudy"
                value={formData.yearOfStudy}
                onChange={handleChange}
              />
            </FormControl>
          </HStack>
          <HStack spacing={6} w="100%">
            <FormControl id="course" w="50%">
              <FormLabel>Course</FormLabel>
              <Input
                type="text"
                placeholder="Enter your course"
                name="course"
                value={formData.course}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="department" w="50%">
              <FormLabel>Department</FormLabel>
              <Input
                type="text"
                placeholder="Enter your department"
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
            </FormControl>
          </HStack>
          <Text>
            Already have an account?{' '}
            <Link
              to="/login"
              style={{
                fontWeight: 'bold',
                color: '#3182ce',
                textDecoration: 'underline',
              }}
            >
              Login
            </Link>
          </Text>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Register
          </Button>
        </VStack>
      </Box>
    </motion.div>
  );
};

export default Register;
