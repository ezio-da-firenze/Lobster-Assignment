import React, { useContext } from 'react';
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
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import Framer Motion
import { UserContext } from '../../Context/UserContext';

import lobster from '../../assets/lobster-home.png';

const LandingPage = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="home">
      <Stack
        direction={['column', 'row']}
        justifyContent={['center', 'space-around']}
        align="center"
      >
        <VStack
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading>Welcome to Lobbie</Heading>
          <Text>Manage your events with ease</Text>
          <HStack>
            {!user ? (
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
            ) : (
              <Link to="/events">
                <Button
                  bg="white"
                  variant="outline"
                  color="black"
                  _hover={{ bg: 'black', color: 'white' }}
                >
                  Go to Events
                </Button>
              </Link>
            )}
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image src={lobster} objectFit="contain" boxSize={['200px', 'xs']} />
        </motion.div>
      </Stack>
    </div>
  );
};

export default LandingPage;
