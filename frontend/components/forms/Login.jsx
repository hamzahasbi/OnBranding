import { 
    Input,
    Stack, 
    InputGroup,
    FormControl,
    InputLeftElement,
    FormErrorMessage,
    Checkbox,
    Heading,
    Button,
 } from "@chakra-ui/react"
import {QuestionIcon, EmailIcon} from '@chakra-ui/icons';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {validationLogin} from '../../config/validators';
import {OptimizedLink} from '../ui-utils/link';


const LoginForm = () => {
    const { handleSubmit, register, errors, formState } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(validationLogin),
        context: undefined,
        criteriaMode: "firstError",
        shouldFocusError: true,
        // shouldUnregister: true,

    });
    
    const onSubmit = (data) => console.log(data, "Valide");
    const onError = (errors) => console.log(errors, "error");
    return (
        <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'}>Sign in to your account</Heading>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <FormControl id="email" isInvalid={errors.username} my={5}>
                    <InputGroup>
                        <InputLeftElement
                        pointerEvents="none"
                        children={<EmailIcon color="gray.300" />}
                        />
                    <Input type="email" placeholder="Email" ref={register} name="username"/>
                    </InputGroup>
                    <FormErrorMessage>
                        {errors.username && errors.username.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl id="password" isInvalid={errors.password} my={3}>
                    <InputGroup>
                        <InputLeftElement
                        pointerEvents="none"
                        children={<QuestionIcon color="gray.300" />}
                        />
                        <Input ref={register} name="password" type="password" placeholder="Password" />
                    </InputGroup>
                    <FormErrorMessage>
                        {errors.password && errors.password.message}
                    </FormErrorMessage>
                </FormControl>
                <Stack spacing={6} my={3}>
                    <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}
                    >
                        <Checkbox colorScheme={'purple'}>Remember me</Checkbox>
                        <OptimizedLink color={'purple.400'} label="Forgot password?" link="#"/>
                    </Stack>
                    <Button colorScheme={'purple'} variant={'outline'} isLoading={formState.isSubmitting} type="submit">
                        Sign in
                    </Button>
                </Stack>
            </form>
        </Stack>
    );
};


export default LoginForm;