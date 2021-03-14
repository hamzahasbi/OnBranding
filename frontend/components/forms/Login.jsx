import { 
    Box,
    Input,
    Stack, 
    InputGroup,
    FormControl,
    InputLeftElement,
    FormErrorMessage,
    Button,
 } from "@chakra-ui/react"
import {QuestionIcon, EmailIcon} from '@chakra-ui/icons';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {validationLogin} from '../../config/validators';



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
        <Box maxW="sm" overflow="hidden" p={4} >
            <Stack spacing={4}>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <FormControl isInvalid={errors.username} mt="4">
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<EmailIcon color="gray.300" />}
                          />
                           <Input ref={register} name="username" type="email" placeholder="Email" />

                        </InputGroup>
                        <FormErrorMessage>
                            {errors.username && errors.username.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.password} mt="2">
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
                    {/* <InputGroup>
                        <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        fontSize="1.2em"
                        children="O"
                        />
                        <Input placeholder="Enter amount" />
                        <InputRightElement children={<CheckIcon color="green.500" />} />
                    </InputGroup> */}
                    <Button mt={4} colorScheme="teal" isLoading={formState.isSubmitting} type="submit">
                      Submit
                    </Button>
                </form>
             </Stack>
         </Box>
    );
};


export default LoginForm;