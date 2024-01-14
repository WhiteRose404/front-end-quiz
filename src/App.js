import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Layout from './layout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Form from './pages/Quiz/Form';
import Menu from './pages/Quiz/Menu';
import SignIn from './pages/Signin';
import { AnimatePresence } from 'framer-motion';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/login',
    element: <SignIn />,
  },
  {
    path: '/quiz',
    element: <Menu />,
  },
  {
    path: '/quiz/:quizTopic',
    element: <Form />,
  },
  {
    path: '*',
    element: <div>404 Not found</div>,
  },
]);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <AnimatePresence mode="wait" exitBeforeEnter>
          <RouterProvider router={router} />
        </AnimatePresence>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
