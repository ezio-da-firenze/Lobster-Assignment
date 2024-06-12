import React, { useContext } from 'react';
import {
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
  SimpleGrid,
  Box,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserContext } from '../../Context/UserContext';
import Feature from './Feature';
import lobster from '../../assets/lobster-home.png';

const features = [
  {
    title: 'Easy Event Management',
    description:
      'Create and manage events effortlessly with our intuitive interface.',
  },
  {
    title: 'Simple Interface',
    description: 'Easy to use and simple interface to create and view events',
  },
  {
    title: 'Real Time Changes',
    description: 'View your events in real time and manage efficiently',
  },
];

const LandingPage = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="home">
      <Stack
        px={8}
        h="100vh"
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
          <Heading>
            {user ? 'Welcome back to Lobbie' : 'Welcome to Lobbie'}
          </Heading>
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

      <Box mt={2} mb={20} px={20} w="full">
        <Heading as="h2" size="xl" textAlign="center" mb={5}>
          Features
        </Heading>
        <SimpleGrid columns={[1, 1, 2, 3]} spacing={10}>
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </SimpleGrid>
      </Box>
    </div>
  );
};

export default LandingPage;
