import * as yup from 'yup';
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/;
export const userSchema=yup.object().shape({
    name:yup.string().required("Required").min(3,"Name should be atleast 3 characters long"),
    email:yup.string().email("Should be a valid Email").required("Required"),
    password:yup.string().matches(passwordRegex,"Password should contain alphabet number and special characters").min(8,"Password should be atleast 8 characters long").required("Required"),
    confirmPassword:yup.string().oneOf([yup.ref('password'),null], 'Passwords must match')
    .required('Required'),
})

export const loginSchema=yup.object().shape({
    email:yup.string().email("Should be a valid Email").required("Required"),
    password:yup.string().matches(passwordRegex,"Password should contain alphabet number and special characters").min(8,"Password should be atleast 8 characters long").required("Required")
})