import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import Layout from './layout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Form from './pages/Form';
import SignIn from './pages/Signin';
import { AnimatePresence } from 'framer-motion';

const router = createBrowserRouter([{
  path: '/',
  // exact: true,
  element: <Home />,
},
{
  path: '/about',
  // exact: true,
  element: <About />,
}, {
  path: '/login',
  // exact: true,
  element: <SignIn />,
}, {
  path: '/form',
  // exact: true,
  element: <Form />,
}, {
  path: '*',
  element: <div>404</div>,
}
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
