import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  useDisclosure,
  VStack,
  Image,
  Box,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { RiMenu5Fill } from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';
import React from 'react';
import lobsterIcon from '../../assets/lobster-icon.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box borderBottom="1px solid #E2E8F0">
      <HStack justifyContent="space-between" align="center" px={8} py={4}>
        <Link to="/">
          <Image src={lobsterIcon} boxSize="30px" />
        </Link>
        <HStack>
          <ColorModeSwitcher />
          <Button
            onClick={onOpen}
            borderRadius="full"
            colorScheme="blue"
            w="25"
            h="12"
            _hover={{ bg: 'blue.200', color: 'blue.800' }}
          >
            <RiMenu5Fill />
          </Button>
        </HStack>
        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay backdropFilter="blur(5px)" />
          <DrawerContent>
            <DrawerHeader>
              <Button variant="ghost" onClick={onClose}>
                <IoMdClose />
              </Button>
            </DrawerHeader>
            <DrawerBody>
              <VStack gap="30px">
                <Link to="/" onClick={onClose}>
                  <Button variant="ghost" colorScheme="blue">
                    Home
                  </Button>
                </Link>
                <Link to="/events" onClick={onClose}>
                  <Button variant="ghost" colorScheme="blue">
                    Events
                  </Button>
                </Link>
                <Link to="/register" onClick={onClose}>
                  <Button
                    variant="solid"
                    colorScheme="blue"
                    _hover={{ bg: 'blue.200', color: 'blue.800' }}
                  >
                    Sign Up
                  </Button>
                </Link>
                <Link to="/login" onClick={onClose}>
                  <Button
                    variant="outline"
                    colorScheme="blue"
                    _hover={{ bg: 'blue.200', color: 'blue.800' }}
                  >
                    Log In
                  </Button>
                </Link>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </HStack>
    </Box>
  );
};

export default Header;
