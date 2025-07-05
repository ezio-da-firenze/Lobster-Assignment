import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cultureLogo from "../../assets/culture.png";
import techLogo from "../../assets/tech.png";
import {
    Box,
    Heading,
    Text,
    Stack,
    Spinner,
    Image,
    Container,
    Button,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { EventDetailContext } from "../../Context/Event.Context";
import eventImage from "../../assets/hall.jpg";

const BASE_URL = "https://lobster-assignment-backend.onrender.com";

const EventDetail = () => {
    const { id } = useParams();
    const { eventDetail, fetchEventDetail, loadingEvent } =
        useContext(EventDetailContext);
    const [registered, setRegistered] = useState(false);
    const toast = useToast();

    useEffect(() => {
        fetchEventDetail(id);
    }, [id]);

    useEffect(() => {
        const isRegistered = localStorage.getItem(`registered_${id}`);
        if (isRegistered === "true") {
            setRegistered(true);
        }
    }, [id]);

    const handleRegister = async () => {
        try {
            await axios.post(
                `${BASE_URL}/api/v1/user/registerevent`,
                { eventId: id },
                { withCredentials: true }
            );

            setRegistered(true);
            localStorage.setItem(`registered_${id}`, "true");
            await fetchEventDetail(id);
            toast({
                title: "Registration successful",
                description: "You have successfully registered for the event.",
                status: "success",
                duration: 3000,
                isClosable: true,
                variant: "subtle",
            });
        } catch (error) {
            const status = error?.response?.status;

            if (status === 401) {
                toast({
                    title: "Not logged in",
                    description: "Please log in to register for the event.",
                    status: "warning",
                    duration: 3000,
                    isClosable: true,
                    variant: "subtle",
                });
            } else if (status === 409) {
                toast({
                    title: "Already registered",
                    description: "You are already registered for the event.",
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                    variant: "subtle",
                });
            } else {
                toast({
                    title: "Registration failed",
                    description:
                        "Failed to register for the event. Please try again later.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    variant: "subtle",
                });
            }
        }
    };

    if (loadingEvent) {
        return (
            <Box textAlign="center">
                <Spinner size="xl" />
                <Text mt={4}>Loading event detail...</Text>
            </Box>
        );
    }

    if (!eventDetail) {
        return (
            <Box textAlign="center">
                <Text>No event found</Text>
            </Box>
        );
    }

    const {
        name,
        description,
        location,
        time,
        category,
        college,
        createdBy,
        registrations,
    } = eventDetail;

    const formattedDate = new Date(time).toLocaleDateString();
    const formattedTime = new Date(time).toLocaleTimeString("en-US", {
        timeZone: "UTC",
        hour: "numeric",
        minute: "2-digit",
    });
    const categoryLogos = {
        cultural: cultureLogo,
        technical: techLogo,
    };
    const selectedLogo = categoryLogos[category] || null;

    return (
        <Container
            maxW={{ base: "container.sm", md: "container.md" }}
            mt={4}
            mb={50}
        >
            <Box
                p={6}
                shadow="md"
                borderWidth="1px"
                borderRadius="lg"
                backgroundColor="white"
            >
                <Image
                    src={eventDetail.thumbnail || eventImage}
                    alt={name}
                    borderRadius="lg"
                    mb={4}
                    objectFit="cover"
                    w="100%"
                    h={{
                        base: "320px",
                        sm: "350px",
                        md: "370px",
                    }}
                    // maxH="300px"
                />

                {selectedLogo && (
                    <Image
                        src={selectedLogo}
                        alt={`${category} logo`}
                        boxSize="60px"
                        mb={2}
                        mx="auto"
                    />
                )}
                <Heading as="h1" size="lg" mb={2}>
                    {name}
                </Heading>
                <Text color="gray.600">{description}</Text>
                <Stack spacing={3} mt={4}>
                    <Text>
                        <strong>Location:</strong> {location}
                    </Text>
                    <Text>
                        <strong>Date:</strong> {formattedDate}
                    </Text>
                    <Text>
                        <strong>Time:</strong> {formattedTime}
                    </Text>
                    <Text>
                        <strong>Category:</strong> {category}
                    </Text>
                    <Text>
                        <strong>College:</strong> {college}
                    </Text>
                    <Text>
                        <strong>Created by:</strong> {createdBy}
                    </Text>
                    <Text>
                        <strong>Registrations:</strong> {registrations}
                    </Text>
                </Stack>
                <Button
                    colorScheme="blue"
                    mt={4}
                    onClick={handleRegister}
                    isDisabled={registered}
                >
                    {registered ? "Already Registered" : "Register"}
                </Button>
            </Box>
        </Container>
    );
};

export default EventDetail;
