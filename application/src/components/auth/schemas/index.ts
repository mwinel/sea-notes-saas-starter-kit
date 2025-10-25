import * as yup from 'yup';

// Base field validators that can be composed
export const emailField = {
  required: () => yup
    .string()
    .required('Please enter a valid email address.')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Please enter a valid email address.'),
  optional: () => yup
    .string()
    .optional()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Please enter a valid email address.'),
};

export const passwordField = {
  required: () => yup.string().required('Password is required'),
  optional: () => yup.string().optional(),
};

export const nameField = {
  required: (fieldName: string) => yup.string().required(`${fieldName} is required`),
};

// Complete form schemas
export const forgotPasswordSchema = yup.object().shape({
  email: emailField.required(),
});

export const loginSchema = yup.object().shape({
  email: emailField.optional(),
  password: passwordField.optional(),
});

export const signupSchema = yup.object().shape({
  firstName: nameField.required('First name'),
  lastName: nameField.required('Last name'),
  email: emailField.required(),
  password: passwordField.required(),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup.string().required('Please enter a new password.'),
  confirmPassword: yup
    .string()
    .required('Please confirm your new password.')
    .oneOf([yup.ref('password')], 'Passwords must match.'),
});
