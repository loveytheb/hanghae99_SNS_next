"use client";

import AuthForm from "@/src/components/AuthForm/AuthForm";
import { useAuthStore } from "@/src/store/auth/authStore";
import { Field } from "@/src/types/authType";
import {
  isValidEmail,
  isValidPassword,
  isValidMessage,
  isValidDisplayname,
} from "@/src/utils/validation";
import React, { useEffect, useState } from "react";
import { registerUserAPI } from "../../api/auth/register/register";

const RegisterPage = () => {
  const authStore = useAuthStore();
  const {
    name,
    email,
    password,
    confirmPassword,
    displayName,
    message,
    reset,
  } = authStore;

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const validateInputs = () => {
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

    setIsFormValid(validateInputs());
  }, [name, email, password, confirmPassword, displayName, message]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await registerUserAPI({
        name,
        email,
        password,
        display_name: displayName,
        message,
      });
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const fields: Field[] = [
    {
      placeholder: "이름",
      id: "name",
      type: "text",
      value: name,
      onChange: (e) => authStore.setName(e.target.value),
    },
    {
      placeholder: "닉네임",
      id: "displayName",
      type: "text",
      value: displayName,
      onChange: (e) => authStore.setDisplayName(e.target.value),
    },
    {
      placeholder: "이메일",
      id: "email",
      type: "email",
      value: email,
      onChange: (e) => authStore.setEmail(e.target.value),
    },
    {
      placeholder: "비밀번호",
      id: "password",
      type: "password",
      value: password,
      onChange: (e) => authStore.setPassword(e.target.value),
    },
    {
      placeholder: "비밀번호 확인",
      id: "confirmPassword",
      type: "password",
      value: confirmPassword,
      onChange: (e) => authStore.setConfirmPassword(e.target.value),
    },
    {
      placeholder: "인사말",
      id: "message",
      type: "text",
      value: message,
      onChange: (e) => authStore.setMessage(e.target.value),
    },
  ];

  return (
    <AuthForm
      title="TAP 가입하기"
      fields={fields}
      buttonLabel="가입하기"
      onSubmit={handleSubmit}
      buttonDisabled={!isFormValid}
    />
  );
};

export default RegisterPage;
