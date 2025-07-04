import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    HStack,
    Text,
    Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const Register = () => {
    const toast = useToast();
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        contact: "",
        college: "",
        course: "",
        department: "",
        yearOfStudy: "",
    });
    const [confirmTouched, setConfirmTouched] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const getConfirmPasswordBorderColor = () => {
        if (!confirmTouched) return "gray.200"; // Default
        if (formData.confirmPassword === formData.password) return "green.500";
        return "red.500";
    };

    const handleSubmit = async () => {
        const requiredFields = [
            "name",
            "username",
            "email",
            "password",
            "confirmPassword",
            "college",
        ];

        for (const field of requiredFields) {
            if (!formData[field]) {
                toast({
                    title: "Missing Field",
                    description: `Please fill the ${field} field.`,
                    status: "warning",
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
                return;
            }
        }

        if (formData.password !== formData.confirmPassword) {
            toast({
                title: "Password Mismatch",
                description: "Password and Confirm Password do not match.",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            return;
        }
        try {
            const response = await axios.post(
                "https://lobster-assignment-backend.onrender.com/api/v1/auth/register",
                formData
            );

            console.log("Registration successful:", response.data);

            toast({
                title: "Registration Successful",
                description: "You have successfully registered.",
                position: "top",
                status: "info",
                duration: 1000,
                isClosable: true,
            });

            setFormData({
                name: "",
                username: "",
                password: "",
                email: "",
                contact: "",
                college: "",
                course: "",
                department: "",
                yearOfStudy: "",
            });
            setTimeout(() => {
                window.location.href = "/login";
            }, 1200);
        } catch (error) {
            if (error.response.status === 409) {
                // console.error('Duplicate credentials:', error);
                toast({
                    title: "Error",
                    description: "Failed to register. Duplicate credentials.",
                    status: "error",
                    duration: 1000,
                    isClosable: true,
                });
            } else {
                // console.error('Error registering:', error);
                toast({
                    title: "Error",
                    description: "Failed to register. Please try again later.",
                    status: "error",
                    duration: 1000,
                    isClosable: true,
                });
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <Box p={4}>
                <Heading size="lg" mb="8" mt="4" ml="16">
                    Register
                </Heading>
                <VStack spacing={6} maxW="md" mx="auto">
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

                    {/*  */}
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
                    {/*  */}
                    <FormControl id="confirmPassword" isRequired>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Confirm your password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            onFocus={() => setConfirmTouched(true)}
                            borderColor={getConfirmPasswordBorderColor()}
                            _hover={{
                                borderColor: getConfirmPasswordBorderColor(),
                            }}
                            _focusVisible={{
                                borderColor: getConfirmPasswordBorderColor(),
                            }}
                        />
                    </FormControl>
                    {/*  */}
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
                        Already have an account?
                        <Link
                            to="/login"
                            style={{
                                fontWeight: "bold",
                                color: "#3182ce",
                                textDecoration: "underline",
                                marginLeft: "4px",
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
