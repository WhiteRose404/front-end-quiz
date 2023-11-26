
import React, { useEffect } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import withAuth from '../lib/auth';

const About = () => {
  
  useEffect(() => {
    withAuth();
  }, []);
  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4} textAlign={"center"}>
        We are the best trust me bro 😎
      </Heading>
    </Box>
  );
};

export default (About);
