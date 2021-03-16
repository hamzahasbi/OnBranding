import '../styles/globals.css';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { theme, Fonts } from '../config/theme';
import dynamic from 'next/dynamic'

const Navigation = dynamic(
  () => import('../layout/screen/Navigation'),
  { ssr: false }
)

function GlobalApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <CSSReset/>
            <Fonts />
            <Navigation/>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default GlobalApp;
