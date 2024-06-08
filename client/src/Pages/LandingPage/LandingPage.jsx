import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import lobster from '../../assets/lobster-home.png';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="home">
      <Stack
        direction={['column', 'row']}
        justifyContent={['center', 'space-around']}
        align="center"
      >
        <VStack>
          <Heading>Welcome to Lobbie</Heading>
          <Text>Manage your events with ease</Text>
          <HStack>
            <Link to="/register">
              <Button
                bg="white"
                variant="outline"
                color="black"
                _hover={{ bg: 'black', color: 'white' }}
              >
                Sign Up
              </Button>
            </Link>
            <Link to="/events">
              <Button
                bg="black"
                variant="solid"
                color="white"
                _hover={{ bg: 'white', color: 'black' }}
              >
                Take a Tour
              </Button>
            </Link>
          </HStack>
        </VStack>
        <Image src={lobster} objectFit="contain" boxSize={['200px', 'xs']} />
      </Stack>
    </div>
  );
};

export default LandingPage;
