import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Text,
  Stack,
  Heading,
  Spinner,
  Center,
  Container,
  SimpleGrid,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/v1/events/all')
      .then(response => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error in fetching events ', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Container maxW="container.xl" p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Current Events
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
        {events.map(event => {
          const eventDate = new Date(event.time);
          const formattedDate = new Date(eventDate).toLocaleDateString();
          const formattedTime = new Date(eventDate).toLocaleTimeString(
            'en-US',
            {
              timeZone: 'UTC',
              hour: 'numeric',
              minute: '2-digit',
            }
          );

          return (
            <Link to={`/events/${event.id}`} key={event.id}>
              <Box
                p={5}
                shadow="md"
                borderWidth="1px"
                borderRadius="md"
                transition="0.3s"
                _hover={{
                  shadow: 'lg',
                  transform: 'translateY(-5px)',
                  background: 'gray.100',
                }}
              >
                <Box
                  boxSize="150px"
                  bg="gray.200"
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb={4}
                >
                  <Text fontSize="3xl" fontWeight="bold" color="gray.600">
                    {event.name.charAt(0)}
                  </Text>
                </Box>
                <Stack>
                  <Heading fontSize="xl">{event.name}</Heading>
                  <Text mt={2}>{event.description}</Text>
                  <Text mt={2} color="gray.500">
                    Location: {event.location}
                  </Text>
                  <Text mt={2} color="gray.500">
                    Category: {event.category}
                  </Text>
                  <Text mt={2} color="gray.500">
                    Date: {formattedDate}
                  </Text>
                  <Text mt={2} color="gray.500">
                    Time: {formattedTime}
                  </Text>
                  <Text mt={2} color="gray.500">
                    College: {event.college}
                  </Text>
                </Stack>
              </Box>
            </Link>
          );
        })}
      </SimpleGrid>
    </Container>
  );
};

export default Events;
