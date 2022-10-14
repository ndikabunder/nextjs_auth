export function loginValidate(values) {
  const errors = {};

  // Validation Email
  if (!values.email) {
    errors.email = 'Required your Email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  // Validation Password
  if (!values.password) {
    errors.password = 'Type your Password';
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = 'Must be greater then 8 and less then 20 character long';
  } else if (values.password.includes(' ')) {
    errors.password = 'Invalid Password';
  }

  return errors;
}

export function registerValidate(values) {
  const errors = {};

  // Validate Email
  if (!values.email) {
    errors.email = 'Enter Your Email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  // Validation Password
  if (!values.password) {
    errors.password = 'Type your Password';
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = 'Must be greater then 8 and less then 20 character long';
  } else if (values.password.includes(' ')) {
    errors.password = 'Invalid Password';
  }

  // Validate Confirm Password
  if (!values.confPassword) {
    errors.confPassword = 'Type Confirm Password';
  } else if (values.password !== values.password) {
    errors.confPassword = 'Password not Match';
  } else if (values.password.includes(' ')) {
    errors.confPassword = 'Invalid Confirm Password';
  }

  return errors;
}
