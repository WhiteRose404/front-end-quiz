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
  useColorModeValue,
  useColorMode,
  Icon,
} from '@chakra-ui/react';
import Loading from '../Loading';
import { motion } from 'framer-motion';
import { Form, useNavigate } from 'react-router-dom';
import withAuth from '../../lib/auth';
import get_quiz from '../../lib/get_quiz';
import { ArrowForwardIcon } from '@chakra-ui/icons';

// imp start page, quiz, result, review components
export default function Quiz (){
  const [state, setState] = React.useState('searching');
  const [quiz, setQuiz] = React.useState([]);
  const [currentRound, setCurrentRound] = React.useState(1);
  const [score, setScore] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    withAuth();
    const fun = async () => {
      const topic = window.location.pathname.split('/')[2];
      // const topic_def = await get_definition(topic);
      try{
        const q = await get_quiz(topic);
        setQuiz(JSON.parse(q));
        setState('ready');
        if (topic === '') {
          setState("Error");
          return;
        }
        console.log(topic);
      }catch(err){
        console.log(err);
        setState("Error");
        return;
      }
    };
    fun();
    // setState('ready');
    setCurrentRound(1);
  }, []);
  const handleNextRound = () => {
    if(currentRound === quiz.length) {
      if(state === 'ready'){
        alert("Quiz completed");
        setState('done');
        setScore(quiz.filter((q) => q.answer === q.userAttempt).length);
        console.log(quiz);
      }
    }
    else if (currentRound < quiz.length) {
      setCurrentRound(currentRound + 1);
    }
  };
  const handleNextReview = () => {
    if(currentRound === quiz.length) {
      navigate('/quiz');
    }
    else if (currentRound < quiz.length) {
      setCurrentRound(currentRound + 1);
    }
  };
  const handlePreviousRound = () => {
    setState('done');
  };
  const handlePreviousReview = () => {
    if (currentRound > 1) {
      setCurrentRound(currentRound - 1);
    }
  };
  if(state === 'searching' || state === 'building' || state === 'validation') return <Loading state={state} />;
  if(state === 'Error') return <Text>Your token is invalid</Text>;
  if(state === 'ready') return <FormUI mode={'quiz'} quiz={quiz} currentRound={currentRound} handleNextRound={handleNextRound} handlePreviousRound={handlePreviousRound} setQuiz={(quiz)=>{setQuiz(quiz)}}/>;
  if(state === 'review') return <FormUI mode={'review'} quiz={quiz} currentRound={currentRound} handleNextRound={handleNextReview} handlePreviousRound={handlePreviousReview} setQuiz={(quiz)=>{setQuiz(quiz)}}/>;
  if(state === 'done') 
    return (
      <Container
        flexDir={"column"}
        gap={12}
        p={4}
        fontFamily={"ubuntu"}
      >
        <Heading>Récapitulatif des erreurs</Heading>
        <Flex
          mt={12}
          gap={4}
          css={{
            '& button': {
              padding: "3rem",
              borderRadius: "1rem",
            }
          }}
          flexWrap={"wrap"}
        >
          {
            quiz.map((q, index) => {
              return (
                <Button
                  key={index}
                  variant="outline"
                  gap={1}
                  alignContent={"center"}
                  textAlign={"start"}
                  cursor={'pointer'}
                  onClick={()=>{
                    setCurrentRound(index+1);
                    setState("review");
                  }}
                  borderColor={q.userAttempt === q.answer ? "green.200" : "red.200"}
                >{index+1}</Button>
              )
            })
          }
        </Flex>
      </Container>
    )
};


function FormUI({ mode, quiz, currentRound, handleNextRound, handlePreviousRound, score, setQuiz, ...props }){
  const Alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  // const container = {
  //   hidden: { opacity: 0 },
  //   show: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.5,
  //     },
  //   },
  // };
  // const item = {
  //   hidden: { opacity: 0 },
  //   show: { opacity: 1 },
  // };
  const [selected, setSelected] = React.useState(quiz[currentRound - 1].userAttempt);
  return (
    <Flex 
      flexDir={"column"}
      gap={5}
      p={4}
      fontFamily={"ubuntu"}
      alignItems={"center"}
    >
      {/*<Box
        textAlign={"center"}
      >
        <Heading textTransform={"uppercase"} opacity={0.4} fontWeight={100} fontSize={"lg"}>
          Comprehension Orale
        </Heading>
        <Text fontWeight={600} opacity={0.8}>
          Ecoutez l'audio et repondez les 4 questions, Choisissez la réponse qui correspond a la question et cliquez sur le reponse correspond.
        </Text>
      </Box>*/}
      <Flex textAlign={"center"} gap={0} flexDir={"column"} mb={8}>
        <Heading mt={{ base: 8}} fontSize={{ base: '2xl'}}>
          {/* {'Cliquez sur votre réponse'} */}
          {quiz.length > 0 && <Text mb={4}>{quiz[currentRound - 1].question}</Text>}
        </Heading>
        {mode === 'review' && <Text fontSize={{ base: 'md'}} color={quiz[currentRound - 1].userAttempt == quiz[currentRound - 1].answer ? "green" : "red"}>{quiz[currentRound - 1].userAttempt == quiz[currentRound - 1].answer ? "Bonne réponse" : "Mavaise réponse"}</Text>}
      </Flex>
      <Flex
        direction="column"
        key={currentRound}
        gap={4}
        alignItems={"start"}
        css={{
          '& div': {
            width: "100%",
          }
        }}
        >
        {quiz.length > 0 &&
          quiz[currentRound - 1].options.map((option, index) => {
            return (
                  // <motion.div
                  //   variants={container}
                  //   initial="hidden"
                  //   animate="show"
                  //   key={index + option + currentRound + Math.random()}
                  // >
                    <Button
                      key={index + option + currentRound + Math.random()}
                      variant="outline"
                      width={"100%"}
                      borderRadius={{ base: "3xl" }}
                      display={'grid'}
                      gridTemplateColumns={"2rem 5fr"}
                      gap={2}
                      alignContent={"center"}
                      textAlign={"start"}
                      py={7}
                      cursor={mode === 'quiz' ? 'pointer' : 'default'}
                      onClick={()=>{
                        if(mode === 'quiz'){
                          quiz[currentRound - 1].userAttempt = index;
                          // console.log("cliecked")
                          setSelected(index);
                          setQuiz(quiz);
                        }
                      }}
                      // bg={mode === 'quiz' ? (quiz[currentRound - 1].userAttempt == index ? "black" : "red"): 'none'}
                      bg={(quiz[currentRound - 1].userAttempt == index ? "gray.300" : "none")}
                      color={"black"}
                      borderColor={mode === 'review' ? (quiz[currentRound - 1].answer == index ? "green.200" : "red.200") : "gray.300"}
                    >
                      <Box
                        bg={quiz[currentRound - 1].userAttempt == index ? "blue.200" : "gray.300"}
                        borderRadius={"100%"}
                        textAlign={"center"}
                        aspectRatio={"1/1"}
                        height={"2rem"}
                        p={3}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        {Alphabets[index]}
                      </Box>
                      <Box 
                        color={quiz[currentRound - 1].userAttempt == index ? "blue.200" : "black"}
                      >{option}</Box>
                    </Button>
                  // </motion.div>
              );
            })}
      </Flex>
      {/* {state === 'result'
        && 
      <Box
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
      </Box>} */}
      <Flex
        direction="row"
        alignItems="end"
        w={"100%"}
        justifyContent={"space-evenly"}
        mt={12}
        css={{
          '& button': {
            padding: "1.5rem 1rem",
            borderRadius: "1rem",
          }
        }}
      >
        <Button onClick={handlePreviousRound} disabled={currentRound <= 1}>
          {mode === 'review' ? 'Question Précedent' : 'Arréter le quiz'}
        </Button>
        <Button
          onClick={handleNextRound}
          disabled={currentRound === quiz.length}
          rightIcon={<Icon as={ArrowForwardIcon} />}
          bg={"blue.200"}
          color={"black"}
        >
          {currentRound === quiz.length ? "Terminer" : "Question suivante"}
        </Button>
      </Flex>
    </Flex>
  )
}