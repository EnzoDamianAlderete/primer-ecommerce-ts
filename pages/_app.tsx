import React from 'react';
import { Box, ChakraProvider, Container, Heading, Image, Text, VStack } from '@chakra-ui/react'
import {AppProps} from "next/app"
import theme from '../theme';

const App: React.FC <AppProps> = ({ Component, pageProps })=>{
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
      <Container backgroundColor="white" boxShadow="md" maxWidth="container.xl" padding={4}
      >
        <VStack marginBottom={6}>
          <Image borderRadius={999} src='//placehold.it/120x120'/>
          <Heading>Almacen</Heading>
          <Text>Almacen en tu wpp</Text>
        </VStack>
      <Component {...pageProps} />
      </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App;