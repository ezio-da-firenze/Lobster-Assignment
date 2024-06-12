import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Feature = ({ title, description }) => {
  return (
    <MotionBox
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      _hover={{
        transform: 'scale(1.05)',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{description}</Text>
    </MotionBox>
  );
};

export default Feature;
