import '../styles/globals.css';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { theme, Fonts } from '../config/theme';


function GlobalApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <CSSReset/>
            <Fonts />

            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default GlobalApp;
