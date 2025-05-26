import { formField } from "../models/from.model";

export const registerField:formField[] = [
    {
        name: 'name',
        label: 'Username',
        type: 'text',
        placeholder: 'Enter username',
        errors: [
           { type: 'required', message: 'Username is required.' },
      {
        type: 'minlength',
        message: 'Username must be at least 3 characters long.',
      },
      { type: 'maxlength', message: 'Username cannot exceed 20 characters.' },
      { type: 'whitespace', message: 'Username cannot contain only spaces.' },
    ],
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email address',
    errors: [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Please enter a valid email address.' },
      { type: 'whitespace', message: 'Username cannot contain only spaces.' },
      { type: 'exists', message: 'This email is already registered.' }
    ]    
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    errors: [
      { type: 'required', message: 'Password is required.' },
      {
        type: 'minlength',
        message: 'Password must be at least 8 characters long.',
      },
      {
        type: 'pattern',
        message:
          'Password needs uppercase, lowercase, number, and special character.',
      },
      { type: 'whitespace', message: 'Password cannot contain only spaces.' },
    ],
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Re-enter your password',
    errors: [
      { type: 'required', message: 'Password is required.' },
      { type: 'mismatch', message: 'Passwords do not match.' },
      { type: 'whitespace', message: 'Confirm Password cannot contain only spaces.' },
    ],
  },
//   {
//     name: 'avatar',
//     label: 'Profile Picture',
//     type: 'file',
//     placeholder: 'Upload your profile picture',
//     errors: [
//       { type: 'required', message: 'Profile picture is required.' },
//       { type: 'fileType', message: 'Only image files (JPG, PNG) are allowed.' },
//       { type: 'whitespace', message: 'Profile picture cannot contain only spaces.' },
//     ],
//   },
];
