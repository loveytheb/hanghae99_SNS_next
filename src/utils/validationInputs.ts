import {
  isValidDisplayname,
  isValidEmail,
  isValidPassword,
  isValidMessage,
} from "./validation";

export const RegisterValidateInputs = (
  displayName: string,
  email: string,
  password: string,
  confirmPassword: string,
  message: string
): boolean => {
  const isDisplayNameValid = isValidDisplayname(displayName);
  const isEmailValid = isValidEmail(email);
  const isPasswordValid = isValidPassword(password);
  const isMessageValid = isValidMessage(message);
  const isPasswordMatch = password === confirmPassword;

  return (
    isDisplayNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isMessageValid &&
    isPasswordMatch
  );
};

export const LoginValidateInputs = (
  email: string,
  password: string
): boolean => {
  const isEmailValid = isValidEmail(email);
  const isPasswordValid = isValidPassword(password);

  return isEmailValid && isPasswordValid;
};
