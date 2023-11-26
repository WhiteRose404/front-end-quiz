
import React from 'react';
import { Container, Box, Button, Heading, Text, Stack, Checkbox } from '@chakra-ui/react';

const Quiz = () => {
  const [currentRound, setCurrentRound] = React.useState(1);

  const handleNextRound = () => {
    if (currentRound < 10) {
      setCurrentRound(currentRound + 1);
    }
  };

  return (
    <Container p={4}>
      <Heading as="h1" mb={4}>
        Quiz
      </Heading>
      <Text mb={4}>Round {currentRound} of 10</Text>
      {/* Render the quiz questions and options here */}
      <Text mb={4}>Question 1</Text>
      <Stack spacing={4}>
        <Box>
            <Checkbox>Option 1</Checkbox>
        </Box>
        <Box>
            <Checkbox>Option 1</Checkbox>
        </Box>
        <Box>
            <Checkbox>Option 1</Checkbox>
        </Box>
        <Box>
            <Checkbox>Option 1</Checkbox>
        </Box>
      </Stack>
      <Button onClick={handleNextRound} disabled={currentRound === 10}>
        Next Round
      </Button>
    </Container>
  );
};

export default Quiz;
