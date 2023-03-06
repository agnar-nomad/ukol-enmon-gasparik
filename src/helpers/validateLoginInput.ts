import { LoginInput } from '../components/Form';

// this function will check if the provided inputs are in the expected format
// if so it return true
// if not, it will throw an error and the encapsulting try/catch statement will handle the error and stop the login process
export function validateLoginInput({ email, password }: LoginInput) {
  if (
    !email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    throw new Error('Your email input is of the incorrent format');
  }

  if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/)) {
    throw new Error(
      'Your password is of the incorrent format. At least one lowercase, one uppercase and one numeric character, minimum 8 characters are required.'
    );
  }
  console.log('VALIDATION: Validation completed');
  return true;
}
