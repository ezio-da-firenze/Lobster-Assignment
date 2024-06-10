import React, { useContext, useEffect, useCallback } from 'react';
import { UserContext } from '../../Context/UserContext';
import { Box, Text, VStack, Container, Avatar, HStack } from '@chakra-ui/react';

const Profile = () => {
  const { user, userEvents, fetchUser } = useContext(UserContext);
  const fetchUserMemo = useCallback(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Container maxW="container.md" mt={8}>
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
    </Container>
  );
};

export default Profile;
