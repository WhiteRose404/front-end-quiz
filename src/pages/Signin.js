import React, { useEffect } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import signin from '../lib/signin';
import signup from '../lib/signup';
import { useNavigate } from 'react-router-dom';


export default function SimpleCard() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const toast = useToast();
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
              <Input type="text" onChange={(e)=>setUsername(e.target.value)} value={username}/>
            </FormControl>
            <FormControl id="password">
              <FormLabel fontSize={'sm'}>Password</FormLabel>
              <Input type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
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
                    toast({
                      title: "Error",
                      description: "Invalid Creadinalis",
                      status: "error",
                      duration: 9000,
                      isClosable: true,
                    })
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
                onClick={onOpen}
                >
                Register
              </Button>
              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Create your account</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>Username/Email</FormLabel>
                      <Input ref={initialRef} placeholder='Username / Email' onChange={(e)=>setUsername(e.target.value)} value={username}/>
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Password</FormLabel>
                      <Input placeholder='*******' type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme='blue'
                      mr={3}
                      onClick={async () => {
                        try{
                          await signup(username, password);
                          toast({
                            title: "Account created.",
                            description: "We've created your account for you.",
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                          })
                          onClose();
                        }catch(err){
                          console.log(err);
                          toast({
                            title: "Error",
                            description: "User Already Exists",
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                          })
                        }
                      }}  
                    >
                      Register
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}