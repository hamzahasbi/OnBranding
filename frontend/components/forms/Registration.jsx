import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationAccount } from '../../config/validators';
import {
    Button,
    Input,
    Stack,
    Box,
    FormControl,
    FormErrorMessage,
} from '@chakra-ui/react';
import FileUpload from '../ui-utils/file-upload';

export default function RegistartionForm() {
    const {
        handleSubmit,
        register,
        reset,
        watch,
        errors,
        formState,
        control,
    } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(validationAccount),
        context: undefined,
        criteriaMode: 'firstError',
        shouldFocusError: true,
        // shouldUnregister: true,
    });

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('avatar', data.avatar);
        console.log(data, 'valid');
        reset();
    };
    const onError = (errors) => console.log(errors, 'error');

    return (
        <Box mt={10}>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <Stack spacing={4}>
                    <FormControl id="name" isInvalid={errors.name}>
                        <Input
                            placeholder="Name"
                            bg={'gray.100'}
                            border={0}
                            color={'gray.500'}
                            _placeholder={{
                                color: 'gray.500',
                            }}
                            type="text"
                            name="name"
                            ref={register}
                        />
                        <FormErrorMessage>
                            {errors.name && errors.name.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl id="email" isInvalid={errors.email}>
                        <Input
                            placeholder="Email"
                            bg={'gray.100'}
                            border={0}
                            color={'gray.500'}
                            _placeholder={{
                                color: 'gray.500',
                            }}
                            type="email"
                            name="email"
                            ref={register}
                        />
                        <FormErrorMessage>
                            {errors.email && errors.email.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl id="password" isInvalid={errors.password}>
                        <Input
                            placeholder="Password"
                            bg={'gray.100'}
                            border={0}
                            color={'gray.500'}
                            _placeholder={{
                                color: 'gray.500',
                            }}
                            type="password"
                            name="password"
                            ref={register}
                            autoComplete="off"
                        />
                        <FormErrorMessage>
                            {errors.password && errors.password.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl id="confirm" isInvalid={errors.confim}>
                        <Input
                            placeholder="Confirm your password"
                            bg={'gray.100'}
                            border={0}
                            color={'gray.500'}
                            _placeholder={{
                                color: 'gray.500',
                            }}
                            type="password"
                            ref={register}
                            name="confirm"
                            autoComplete="off"
                        />
                        <FormErrorMessage>
                            {errors.confirm && errors.confirm.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FileUpload
                        placeholder="Upload a file"
                        bg={'gray.100'}
                        border={0}
                        color={'gray.500'}
                        _placeholder={{
                            color: 'gray.500',
                        }}
                        children={'Avatar photo'}
                        acceptedFileTypes="image/*"
                        name="avatar"
                        reset={reset}
                        oldValues={watch()}
                        control={control}
                    />

                    <Button
                        fontFamily={'heading'}
                        mt={8}
                        w={'full'}
                        bgGradient="linear(to-r, purple.300,purple.700)"
                        color={'white'}
                        _hover={{
                            bgGradient: 'linear(to-r, purple.600,purple.800)',
                            boxShadow: 'xl',
                        }}
                        type="submit"
                        isLoading={formState.isLoading}
                    >
                        Submit
                    </Button>
                </Stack>
            </form>
        </Box>
    );
}
