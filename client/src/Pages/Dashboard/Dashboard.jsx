import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/User.Context";
import {
    Box,
    Text,
    VStack,
    Container,
    Avatar,
    HStack,
    SimpleGrid,
    Heading,
    Button,
    useToast,
} from "@chakra-ui/react";
import { RiCloseCircleLine } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, events, setEvents } = useContext(UserContext);
    const [removing, setRemoving] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const handleRemoveEvent = async (eventId) => {
        setRemoving(true);
        try {
            await axios.post(
                "https://lobster-assignment-backend.onrender.com/api/v1/user/removeevent",
                { eventId },
                { withCredentials: true }
            );

            // Update the events in the context
            const updatedEvents = events.filter(
                (event) => event.id !== eventId
            );
            setEvents(updatedEvents);

            toast({
                title: "Event unregistered",
                description:
                    "You have successfully unregistered from the event.",
                status: "success",
                duration: 3000,
                isClosable: true,
                variant: "subtle",
            });
        } catch (error) {
            console.log(error.message);
            toast({
                title: "Unregistration failed",
                description:
                    "Failed to unregister from the event. Please try again later.",
                status: "error",
                duration: 3000,
                isClosable: true,
                variant: "subtle",
            });
        } finally {
            setRemoving(false);
        }
    };

    return (
        <Container maxW="container.md" mt={8}>
            <Heading size="lg" my="8">
                Profile
            </Heading>
            <Box
                p={8}
                shadow="lg"
                borderWidth="1px"
                borderRadius="lg"
                bg="white"
            >
                <HStack spacing={4} align="center">
                    <Avatar
                        size="xl"
                        name={user ? user.name : "Guest"}
                        src={user ? user.profilePicture : ""}
                    />
                    <VStack align="start" spacing={1}>
                        <Text fontSize="2xl" fontWeight="bold">
                            {user ? user.name : "Guest"}
                        </Text>
                        <Text color="gray.500">
                            {user ? user.username : "No username available"}
                        </Text>
                        <Text color="gray.500">{user ? user.role : ""}</Text>
                    </VStack>
                </HStack>
                <VStack align="start" spacing={3} mt={4}>
                    {user && (
                        <>
                            {user.email ? (
                                <Text>Email: {user.email}</Text>
                            ) : (
                                <Text color="gray.500">
                                    Email: Not provided
                                </Text>
                            )}
                            {user.college ? (
                                <Text>College Name: {user.college}</Text>
                            ) : (
                                <Text color="gray.500">
                                    College Name: Not provided
                                </Text>
                            )}
                            {user.contact ? (
                                <Text>Contact Number: {user.contact}</Text>
                            ) : (
                                <Text color="gray.500">
                                    Contact Number: Not provided
                                </Text>
                            )}
                        </>
                    )}
                </VStack>
            </Box>

            <Container maxW="container.lg" my={16}>
                <Heading size="md" py="4">
                    Events Registered
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {events.map((event) => (
                        <Box
                            key={event.id}
                            onClick={() => navigate(`/events/${event.id}`)}
                            position="relative"
                            p={6}
                            borderWidth="1px"
                            borderRadius="md"
                            backgroundColor="gray.100"
                            _hover={{
                                backgroundColor: "gray.200",
                                cursor: "pointer",
                            }}
                        >
                            <Button
                                position="absolute"
                                top={2}
                                right={2}
                                rounded="full"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveEvent(event.id)}
                                isLoading={removing}
                            >
                                <RiCloseCircleLine />
                            </Button>
                            <Text fontSize="2xl" fontWeight="bold">
                                {event.name}
                            </Text>
                            <Text>
                                Date:{" "}
                                {new Date(event.time).toLocaleDateString()}
                            </Text>
                            <Text>College: {event.college}</Text>
                        </Box>
                    ))}
                </SimpleGrid>
            </Container>
        </Container>
    );
};

export default Profile;
