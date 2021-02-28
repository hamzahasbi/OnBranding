import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { theme, Fonts } from '../config/theme';

function GlobalApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <Fonts />
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default GlobalApp;
