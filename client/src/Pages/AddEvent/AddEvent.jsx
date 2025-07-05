import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    VStack,
    useToast,
    Heading,
} from "@chakra-ui/react";
import axios from "axios";

const URL = "https://lobster-assignment-backend.onrender.com/api/v1/events/add";

const AddEvent = () => {
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        description: "",
        time: "",
        category: "",
    });

    const [thumbnail, setThumbnail] = useState(null);
    const toast = useToast();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setThumbnail(e.target.files[0]); // Only the first file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) =>
            payload.append(key, value)
        );
        if (thumbnail) {
            payload.append("thumbnail", thumbnail);
        }

        try {
            const response = await axios.post(URL, payload, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data);

            toast({
                title: "Event Added",
                description: "Event has been successfully added.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            setFormData({
                name: "",
                location: "",
                description: "",
                time: "",
                category: "",
            });
            setThumbnail(null);
        } catch (error) {
            console.error("Error adding event:", error);
            toast({
                title: "Failed to Add Event",
                description: "An error occurred while adding the event.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={4}>
            <Heading size="lg" pb="8" pt="4">
                Add an Event
            </Heading>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <VStack spacing={4} align="stretch">
                    <FormControl id="name" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl id="location">
                        <FormLabel>Location</FormLabel>
                        <Input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl id="description">
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl id="time" isRequired>
                        <FormLabel>Time</FormLabel>
                        <Input
                            type="datetime-local"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl id="category" isRequired>
                        <FormLabel>Category</FormLabel>
                        <Select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="">--select--</option>
                            <option value="cultural">Cultural</option>
                            <option value="technical">Technical</option>
                        </Select>
                    </FormControl>

                    <FormControl id="thumbnail">
                        <FormLabel>Thumbnail Image</FormLabel>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </FormControl>

                    <Button type="submit" colorScheme="blue">
                        Add Event
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default AddEvent;
