import React, { useEffect } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
} from '@chakra-ui/react';
import signin from '../lib/signin';
import { useNavigate } from 'react-router-dom';


export default function SimpleCard() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  useEffect(() => {
    // remove token from local storage
    localStorage.removeItem('token');
  }, []);
  return (
    <Flex
      align={'center'}
      justify={'center'}>
      <Stack spacing={8} mx={'auto'} my={'10%'} maxW={'lg'} py={12} px={6}>
        <Box
          rounded={'lg'}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel fontSize={'sm'}>Username</FormLabel>
              <Input type="text" onChange={(e)=>setUsername(e.target.value)}/>
            </FormControl>
            <FormControl id="password">
              <FormLabel fontSize={'sm'}>Password</FormLabel>
              <Input type="password" onChange={(e)=>setPassword(e.target.value)}/>
            </FormControl>
            <Stack spacing={2}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={async () => {
                  try{
                    await signin(username, password);
                  }catch(err){
                    console.log(err);
                  }
                }}
                >
                Log in
              </Button>
              <Button
                color={'blue.400'}
                variant={"outline"}
                borderColor={"blue.400"}
                _hover={{
                  color: "white",
                  bg: 'blue.300',
                }}
                onClick={async () => {
                  try{
                    await signin(username, password);
                  }catch(err){
                    console.log(err);
                  }
                }}
                >
                Register
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}