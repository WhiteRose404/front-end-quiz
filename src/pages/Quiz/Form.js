import React, { useEffect } from 'react';
import {
  Container,
  Button,
  Heading,
  Text,
  Grid,
  Flex,
  Radio,
  RadioGroup,
  Box,
} from '@chakra-ui/react';
import Loading from '../Loading';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// imp start page, quiz, result, review components
const Quiz = () => {
  const [state, setState] = React.useState('searching');
  const [quiz, setQuiz] = React.useState([]);
  const [currentRound, setCurrentRound] = React.useState(1);
  const [score, setScore] = React.useState(0);
  const navigate = useNavigate();
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  useEffect(() => {
    setQuiz([
      {
        question: 'What is the capital of France?',
        options: ['New York', 'London', 'Paris', 'Dublin'],
        answer: 'Paris',
        explication: 'Loream ipsum dolor sit amet consectetur adipisiciing elit quia.'
      },
      {
        question: 'Who is CEO of Tesla?',
        options: ['Jeff Bezos', 'Elon Musk', 'Bill Gates', 'Tony Stark'],
        answer: 'Elon Musk',
        explication: 'Loream ipsum dolor sit amet consectetur adipisiciing elit quia.'
      },
      {
        question: 'The iPhone was created by which company?',
        options: ['Apple', 'Intel', 'Amazon', 'Microsoft'],
        answer: 'Apple',
        explication: 'Loream ipsum dolor sit amet consectetur adipisiciing elit quia.'
      },
      {
        question: 'How many Harry Potter books are there?',
        options: ['1', '4', '6', '7'],
        answer: '7',
        explication: 'Loream ipsum dolor sit amet consectetur adipisiciing elit quia.'
      },
      {
        question: 'How many sides does a triangle have?',
        options: ['3', '4', '6', '7'],
        answer: '3',
        explication: 'Loream ipsum dolor sit amet consectetur adipisiciing elit quia.'
      },
      {
        question: 'What is the capital of France?',
        options: ['New York', 'London', 'Paris', 'Dublin'],
        answer: 'Paris',
        explication: 'Loream ipsum dolor sit amet consectetur adipisiciing elit quia.'
      },
      {
        question: 'Who is CEO of Tesla?',
        options: ['Jeff Bezos', 'Elon Musk', 'Bill Gates', 'Tony Stark'],
        answer: 'Elon Musk',
        explication: 'Loream ipsum dolor sit amet consectetur adipisiciing elit quia.'
      },
      {
        question: 'The iPhone was created by which company?',
        options: ['Apple', 'Intel', 'Amazon', 'Microsoft'],
        answer: 'Apple',
        explication: 'Loream ipsum dolor sit amet consectetur adipisiciing elit quia.'
      },
      {
        question: 'How many Harry Potter books are there?',
        options: ['1', '4', '6', '7'],
        answer: '7',
        explication: 'Loream ipsum dolor sit amet consectetur adipisiciing elit quia.'
      },
      {
        question: 'How many sides does a triangle have?',
        options: ['3', '4', '6', '7'],
        answer: '3',
        explication: 'Loream ipsum dolor sit amet consectetur adipisiciing elit quia.'
      },
    ]);
    setState('ready');
    setCurrentRound(1);
  }, []);
  const handleNextRound = () => {
    if(currentRound === quiz.length) {
      if(state === 'ready'){
        alert("Quiz completed");
        setState('result');
        setScore(quiz.filter((q) => q.answer === q.userAttempt).length);
        console.log(quiz);
      }else if(state === 'result'){
        navigate(`/quiz`)
      }
      
    }
    else if (currentRound < quiz.length) {
      setCurrentRound(currentRound + 1);
    }
  };
  const handlePreviousRound = () => {
    if (currentRound > 1) {
      setCurrentRound(currentRound - 1);
    }
  };
  if (state === 'searching' || state === 'building' || state === 'validation')
    return <Loading state={state} />;
  return (
    <Container p={4}>
      <Heading as="h1" mb={4}>
        {state === 'result' ? 'Result' : 'Quiz'}
      </Heading>
      {state === 'result' && <Text mb={4}>Score: {score}</Text>}
      <Text mb={4}>Round {currentRound} of 10</Text>
      {/* Render the quiz questions and options here */}
      {quiz.length > 0 && <Text mb={4}>{quiz[currentRound - 1].question}</Text>}
      <RadioGroup
          key={currentRound}
          disabled={state === 'result'}
          onChange={(value) => {
            if(state === 'result') return;
            quiz[currentRound - 1].userAttempt = value;
            console.log(quiz);
          }}
          value={state === 'result' ? quiz[currentRound - 1].answer : quiz[currentRound - 1].userAttempt}

          >
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {quiz.length > 0 &&
          quiz[currentRound - 1].options.map((option, index) => {
            return (
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    key={index + option}
                  >
                    <Radio value={option} 
                      disabled={state === 'result'}
                    >
                      <motion.div variants={item}>{option}</motion.div>
                    </Radio>
                  </motion.div>
              );
            })}
        </Grid>
      </RadioGroup>
      {state === 'result' && <Box
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        mt={5}
      >
        <Box>
          <Text
            fontWeight={600}
            fontSize={'sm'}
            color={'black'}
            bg={'blue.50'}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}
          >{quiz[currentRound - 1].explication}</Text>
        </Box>
      </Box>}
      <Flex
        direction="row"
        alignItems="end"
        justifyContent="center"
        // height="100vh"
        gap={{
          base: 2,
        }}
        mt={3}
      >
        <Button onClick={handlePreviousRound} disabled={currentRound <= 1}>
          Previous
        </Button>
        <Button
          onClick={handleNextRound}
          disabled={currentRound === quiz.length}
        >
          {currentRound === quiz.length ? state === 'result' ? "Another Quiz" : "submit" : "Next"}
        </Button>
      </Flex>
    </Container>
  );
};

export default Quiz;
