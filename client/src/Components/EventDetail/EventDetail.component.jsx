import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
} from '@chakra-ui/react';
import axios from 'axios';
import eventImage from '../../assets/hall.jpg';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const toast = useToast();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/events/${id}`, {
        withCredentials: true,
      })
      .then(response => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching event detail:', error);
        setLoading(false);
      });
  }, [id, registered]);

  const handleRegister = async () => {
    try {
      await axios.post(
        'http://localhost:3000/api/v1/user/registerevent',
        { eventId: id },
        { withCredentials: true }
      );
      setRegistered(true);
      toast({
        title: 'Registration successful',
        description: 'You have successfully registered for the event.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        variant: 'subtle',
      });
    } catch (error) {
      if (error.response.status === 409) {
        toast({
          title: 'Already registered',
          description: 'You are already registered for the event.',
          status: 'info',
          duration: 3000,
          isClosable: true,
          variant: 'subtle',
        });
      } else {
        toast({
          title: 'Registration failed',
          description:
            'Failed to register for the event. Please try again later.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          variant: 'subtle',
        });
      }
    }
  };

  if (loading) {
    return (
      <Box textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>Loading event detail...</Text>
      </Box>
    );
  }

  if (!event) {
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
    imageUrl,
  } = event;

  // Format date and time
  const formattedDate = new Date(time).toLocaleDateString();
  const formattedTime = new Date(time).toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <Container maxW={{ base: 'container.sm', md: 'container.md' }} mt={4}>
      <Box
        p={6}
        shadow="md"
        borderWidth="1px"
        borderRadius="lg"
        backgroundColor="white"
      >
        {/* Image of the event */}
        {eventImage && (
          <Image src={eventImage} alt={name} borderRadius="lg" mb={4} />
        )}
        {/* Details of the event */}
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
          colorScheme={registered ? 'green' : 'blue'}
          mt={4}
          onClick={handleRegister}
          isDisabled={registered}
        >
          {registered ? 'Registered' : 'Register'}
        </Button>
      </Box>
    </Container>
  );
};

export default EventDetail;
