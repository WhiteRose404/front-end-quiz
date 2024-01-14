import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@chakra-ui/react';
export default ({state}) => {
    return (
        <Container
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            h={"80vh"}
        >

            <motion.div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100px",
                    height: "100px",
                    backgroundColor: "red",
                }}
                animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 180, 180, 0],
                    borderRadius: ["0%", "0%", "50%", "50%", "0%"]
                }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1
                }}
            >
                <motion.div
                    animate={{
                        scale: [2, 1, 1, 2, 2],
                        rotate: [0, 0, -180, -180, 0],
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.5, 0.8, 1],
                        repeat: Infinity,
                        repeatDelay: 1
                    }}
                >
                    {state.charAt(0).toUpperCase()}
                </motion.div>
            </motion.div>
        </Container>
    );
};