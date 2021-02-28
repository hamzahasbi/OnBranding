import * as yup from 'yup';

export const validationLogin = yup.object().shape({
    username: yup
        .string()
        .email('Invalid Email')
        .required('Email is Required.'),
    password: yup
        .string()
        .required('Password is Required.'),
});

export const validationAccount = yup.object().shape({
    email: yup
        .string()
        .email('Invalid Email')
        .required('Email is Required.'),
    password: yup
        .string()
        .required('Password is Required.'),
    confirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});
