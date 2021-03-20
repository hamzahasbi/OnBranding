import { default as NextLink } from 'next/link';
import { Link } from '@chakra-ui/react';
export const OptimizedLink = ({ link, label, ...rest }) => {
    return (
        <NextLink href={link} passHref>
            <Link {...rest}>{label}</Link>
        </NextLink>
    );
};
