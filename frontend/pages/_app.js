import '../styles/globals.css';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { theme, Fonts } from '../config/theme';
import dynamic from 'next/dynamic';
import SmallWithLogoLeft from '../layout/screen/Footer';

const Navigation = dynamic(() => import('../layout/screen/Navigation'), {
    ssr: false,
});

function GlobalApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <CSSReset />
            <Fonts />
            <Navigation />
            <Component {...pageProps} />
            <SmallWithLogoLeft />
        </ChakraProvider>
    );
}

export default GlobalApp;
