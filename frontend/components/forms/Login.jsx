import { 
    Box,
    Input,
    Stack, 
    InputRightElement, 
    InputGroup,
    InputLeftElement,
    Button,
 } from "@chakra-ui/react"
import {CheckIcon, PhoneIcon} from '@chakra-ui/icons';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {validationLogin} from '../../config/validators';
import {useState} from 'react';



const LoginForm = () => {
    const { handleSubmit, register } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(validationLogin),
        context: undefined,
        criteriaMode: "firstError",
        shouldFocusError: true,
    });
    
    const {loading, setLoading} = useState(false);
    return (
        <Box maxW="sm"  overflow="hidden">
            <Stack spacing={4}>
                <form onSubmit={handleSubmit(d => {
                    setLoading(true);
                    console.log(d);
                })}>
                    <InputGroup>
                        <InputLeftElement
                        pointerEvents="none"
                        children={<PhoneIcon color="gray.300" />}
                        />
                        <Input ref={register} name={"username"} type="email" placeholder="Phone number" />
                    </InputGroup>

                    <InputGroup>
                        <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        fontSize="1.2em"
                        children="$"
                        />
                        <Input placeholder="Enter amount" />
                        <InputRightElement children={<CheckIcon color="green.500" />} />
                    </InputGroup>
                    <Button
                        isLoading={loading}
                        loadingText="Submitting"
                        colorScheme="teal"
                        variant="outline">
                        Submit
                    </Button>
                </form>
            </Stack>
        </Box>
    );
};

export default LoginForm;