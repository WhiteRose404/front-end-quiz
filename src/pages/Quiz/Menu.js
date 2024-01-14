
import React, { useEffect } from 'react';
import { Container, Box, Button, Heading, Text, Stack, Checkbox, Input, Select, Flex } from '@chakra-ui/react';
import { 
  AnimatePresence,
  motion
} from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import withAuth from '../../lib/auth';

const Quiz = () => {
  useEffect(() => {
    console.log("Quiz");
    withAuth();
  }, []);
  const [currentRound, setCurrentRound] = React.useState(1);
  const [quizTopic, setQuizTopic] = React.useState("");
  const [customQuizTopic, setCustomQuizTopic] = React.useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    if(quizTopic === "" && customQuizTopic === "") {
      alert("Please select a topic");
      return;
    }
    const topic = quizTopic === "" ? customQuizTopic : quizTopic;
    // window.location.href = `/quiz/${topic}`;
    navigate(`/quiz/${topic}`);
  };
  return (
    <Container p={4}>
      <Heading as="h1" mb={4}>
        Choose a topic
      </Heading>
      <Flex
        direction="column"
        alignItems="flex-start"
        justifyContent="center"
        // height="100vh"
        gap={{
          base: 2,
        }}
      >

        <Text mb={2}>You can select a topic for the quiz</Text>
        {/* Render the quiz questions and options here */}
        <Select
          onChange={(e)=>{
            setQuizTopic(e.target.value);
          }}
        >
          <option value="Supply Chain">Supply Chain</option>
          <option value="Economics">Economics</option>
          <option value="Finance">Finance</option>
          <option value="">Other</option>
        </Select>
        <AnimatePresence >
          {quizTopic === '' && (
            <Box
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ml={5}
            >
              <Text>Choose other topic:</Text>
              <Input
                placeholder="Blood cells"
                onChange={(e)=>{
                  setCustomQuizTopic(e.target.value);
                }}
              />
            </Box>)}
        </AnimatePresence>
        <Button ml={"auto"} onClick={handleSubmit}>
          Start Quiz
        </Button>
      </Flex>
    </Container>
  );
};

export default Quiz;
