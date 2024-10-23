"use client";

import AuthForm from "@/src/components/AuthForm/AuthForm";
import { useAuthStore } from "@/src/store/auth/authStore";
import { Field } from "@/src/types/authType";
import { isValidEmail, isValidPassword } from "@/src/utils/validation";
import React from "react";
import { loginUserAPI } from "../../api/auth/login";

const LoginPage = () => {
  const authStore = useAuthStore();
  const { email, password, setIsLoggedIn, reset } = useAuthStore();

  const validateInputs = () => {
    const isEmailValid = isValidEmail(email);
    const isPasswordValid = isValidPassword(password);
    return isEmailValid && isPasswordValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateInputs()) {
      console.error("이메일 또는 비밀번호가 유효하지 않습니다.");
      return;
    }

    try {
      validateInputs();
      await loginUserAPI({ email, password });
      setIsLoggedIn(true);
      reset();
      console.log("로그인 성공");
    } catch (error) {
      console.error(error);
    }
  };

  const fields: Field[] = [
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
  ];

  const isFormValid = validateInputs();

  return (
    <AuthForm
      title="TAP 로그인하기"
      fields={fields}
      buttonLabel="로그인하기"
      onSubmit={handleSubmit}
      showSocialButtons={true}
      buttonDisabled={!isFormValid}
    />
  );
};

export default LoginPage;
