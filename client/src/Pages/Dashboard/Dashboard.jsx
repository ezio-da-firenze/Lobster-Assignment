import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import {
  Box,
  Text,
  VStack,
  Container,
  Avatar,
  HStack,
  SimpleGrid,
  Heading,
} from '@chakra-ui/react';

const Profile = () => {
  const { user, events } = useContext(UserContext);
  return (
    <Container maxW="container.md" mt={8}>
      <Heading size="lg" my="8">
        Profile
      </Heading>
      <Box p={8} shadow="lg" borderWidth="1px" borderRadius="lg" bg="white">
        <HStack spacing={4} align="center">
          <Avatar
            size="xl"
            name={user ? user.name : 'Guest'}
            src={user ? user.profilePicture : ''}
          />
          <VStack align="start" spacing={1}>
            <Text fontSize="2xl" fontWeight="bold">
              {user ? user.name : 'Guest'}
            </Text>
            <Text color="gray.500">
              {user ? user.username : 'No username available'}
            </Text>
            <Text color="gray.500">{user ? user.role : ''}</Text>
          </VStack>
        </HStack>
        <VStack align="start" spacing={3} mt={4}>
          {user && (
            <>
              {user.email ? (
                <Text>Email: {user.email}</Text>
              ) : (
                <Text color="gray.500">Email: Not provided</Text>
              )}
              {user.college ? (
                <Text>College Name: {user.college}</Text>
              ) : (
                <Text color="gray.500">College Name: Not provided</Text>
              )}
              {user.contact ? (
                <Text>Contact Number: {user.contact}</Text>
              ) : (
                <Text color="gray.500">Contact Number: Not provided</Text>
              )}
            </>
          )}
        </VStack>
      </Box>

      <Container maxW="container.lg" my={16}>
        <Heading size="md" py="4">
          Events Registered
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {events.map(event => (
            <Box
              key={event.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              backgroundColor="gray.100"
              _hover={{ backgroundColor: 'gray.200', cursor: 'pointer' }}
            >
              <Text fontSize="xl" fontWeight="bold">
                {event.name}
              </Text>
              <Text>Date: {new Date(event.time).toLocaleDateString()}</Text>
              <Text>College: {event.college}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Container>
  );
};

export default Profile;
