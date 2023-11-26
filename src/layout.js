import React from 'react';
import Nav from './common/nav';
import Footer from './common/footer';
import {Box} from '@chakra-ui/react';

function Layout({children}) {
    return (
        <Box
            bg="gray.50"
            minH="100vh"
            display="flex"
            flexDirection="column"
        >
            {/* Your header component */}
            <Nav />

            {/* Your main content */}
            {children}

            {/* Your footer component */}
            <Footer />
        </Box>
    );
}

export default Layout;
