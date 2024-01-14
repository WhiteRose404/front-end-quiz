import React, { useEffect } from 'react';
import {
  Container,
  Button,
  Heading,
  Text,
  Flex,
  Box,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';
import withAuth from '../../lib/auth';
import get_quiz from '../../lib/get_quiz';
import { ArrowForwardIcon } from '@chakra-ui/icons';

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
      try{
        const q = await get_quiz(topic);
        setQuiz(JSON.parse(q));
        setState('ready');
        if (topic === '') {
          setState("Error");
          return;
        }
      }catch(err){
        console.log(err);
        setState("Error");
        return;
      }
    };
    fun();
    setCurrentRound(1);
  }, []);
  const handleNextRound = () => {
    if(currentRound === quiz.length) {
      if(state === 'ready'){
        alert("Quiz completed");
        setState('done');
        setScore(quiz.filter((q) => q.answer === q.userAttempt).length);
      }
    }
    else if (currentRound < quiz.length) {
      setCurrentRound(currentRound + 1);
    }
  };
  const handleNextReview = () => {
    if(currentRound === quiz.length) {
      localStorage.removeItem(window.location.pathname.split('/')[2]);
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
  if(state === 'review') return <FormUI setMode={() => setState("done") } mode={'review'} quiz={quiz} currentRound={currentRound} handleNextRound={handleNextReview} handlePreviousRound={handlePreviousReview} setQuiz={(quiz)=>{setQuiz(quiz)}}/>;
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
                  borderColor={q.userAttempt == q.answer ? "green.200" : "red.200"}
                >{index+1}</Button>
              )
            })
          }
        </Flex>
        <Heading
          textAlign={"center"}
          marginTop={5}
        >
          {`Votre score est ${score}/${quiz.length}`}
        </Heading>
      </Container>
    )
};


function FormUI({ setMode, mode, quiz, currentRound, handleNextRound, handlePreviousRound, score, setQuiz, ...props }){
  const Alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const [selected, setSelected] = React.useState(quiz[currentRound - 1].userAttempt);
  const normalMode = useColorModeValue("black", "white");
  const selectedMode = useColorModeValue("blue.200", "blue.800");
  return (
    <Flex 
      flexDir={"column"}
      gap={5}
      p={4}
      fontFamily={"ubuntu"}
      alignItems={"center"}
    >
      <Box
        textAlign={"center"}
      >
        <Heading textTransform={"uppercase"} opacity={0.4} fontWeight={100} fontSize={"lg"}>
          {`Question ${currentRound}/${quiz.length}`}
        </Heading>
      </Box>
      <Flex textAlign={"center"} gap={0} flexDir={"column"} mb={8}>
        <Heading mt={{ base: 8}} fontSize={{ base: '2xl'}}>
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
                          setSelected(index);
                          setQuiz(quiz);
                        }
                      }}
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
                        color={quiz[currentRound - 1].userAttempt == index ? selectedMode : normalMode}
                      >{option}</Box>
                    </Button>
              );
            })}
      </Flex>
      {mode === 'review'
        && 
          <Box
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
        {
          mode === 'review' && (
            <Button
              onClick={()=>{
                setMode();
              }}
              disabled={currentRound === quiz.length}
              bg={"blue.200"}
              color={"black"}
            >
              Board
            </Button>
          )
        }
        <Button
          onClick={()=>{
            setSelected(-1);
            handleNextRound();
          }}
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