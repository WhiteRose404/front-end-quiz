'use client'

import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Button,
} from '@chakra-ui/react'
// import { IoAnalyticsSharp, IoLogoBitcoin, IoSearchSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'


const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex w={8} h={8} align={'center'} justify={'center'} rounded={'full'} bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  )
}

export default function SplitWithImage() {
  return (
    <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            Our Product
          </Text>
          <Heading>Your AI-Powered Quiz Generator</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            QuizGenius leverages the latest in artificial intelligence to create engaging and challenging quizzes across various fields. Whether you're a student, educator, or just love learning, our quizzes are tailored for you.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
            }>
            <Feature
              icon={<Icon color={'yellow.500'} w={5} h={5} />}
              iconBg={useColorModeValue('yellow.100', 'yellow.900')}
              text={'AI-Powered Questions'}
            />
            <Feature
              icon={<Icon color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Wide Range of Topics'}
            />
            <Feature
              icon={<Icon color={'purple.500'} w={5} h={5} />}
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={'Real-time Feedback'}
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={
              'https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
            objectFit={'cover'}
          />
        </Flex>
        <Button
            as={Link}
            mt={8}
            w={'full'}
            gridColumnStart={{ base: '1', md: '1' }}
            gridColumnEnd={{ base: '2', md: '3' }}
            bgGradient="linear(to-r, red.400,pink.400)"
            color={'white'}
            rounded={'md'}
            boxShadow={'0 5px 20px 0px rgb(248 113 113 / 43%)'}
            _hover={{
              bgGradient: 'linear(to-r, red.400,pink.400)',
              boxShadow: 'xl',
            }}
            _focus={{
              bgGradient: 'linear(to-r, red.400,pink.400)',
            }}
            to={'/login'}
        >
            Start QuizGenius
        </Button>
      </SimpleGrid>
    </Container>
  )
}