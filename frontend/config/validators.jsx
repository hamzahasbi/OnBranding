import * as yup from 'yup';

export const validationLogin = yup.object().shape({
    username: yup
        .string()
        .email('Invalid Email')
        .required('Email is Required.'),
    password: yup.string().required('Password is Required.'),
});

export const validationAccount = yup.object().shape({
    email: yup.string().email('Invalid Email').required('Email is Required.'),
    name: yup.string().required('Name is required'),
    password: yup
        .string()
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
        )
        .required('Password is Required.'),
    confirm: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
