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
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiSearch2Line } from 'react-icons/ri';

const MotionBox = motion(Box);

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/v1/events/all', { withCredentials: true })
      .then(response => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error in fetching events ', error);
        setLoading(false);
      });
  }, []);

  // Funciton to set the search text on change of input
  const handleSearch = event => {
    setSearchText(event.target.value);
  };

  // Filter events on the basis of name
  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchText.toLowerCase())
  );

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
      <InputGroup mb={5}>
        <InputLeftElement pointerEvents="none" children={<RiSearch2Line />} />
        <Input
          type="text"
          placeholder="Search events by name"
          value={searchText}
          onChange={handleSearch}
        />
      </InputGroup>
      {filteredEvents.length === 0 ? (
        <Center>
          <Text fontSize="2xl" color="gray.500">
            No current events
          </Text>
        </Center>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
          {filteredEvents.map((event, index) => {
            const eventDate = new Date(event.time);
            const formattedDate = eventDate.toLocaleDateString();
            const formattedTime = eventDate.toLocaleTimeString('en-US', {
              timeZone: 'UTC',
              hour: 'numeric',
              minute: '2-digit',
            });

            return (
              <Link to={`/events/${event.id}`} key={event.id}>
                <MotionBox
                  p={5}
                  shadow="md"
                  borderWidth="1px"
                  borderRadius="md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
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
                </MotionBox>
              </Link>
            );
          })}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default Events;
