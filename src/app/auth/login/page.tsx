"use client";

import AuthForm from "@/src/components/AuthForm/AuthForm";
import { useAuthStore } from "@/src/store/auth/authStore";
import React, { useEffect, useState } from "react";
import useAuthFields from "./data";
import { LoginValidateInputs } from "@/src/utils/validationInputs";

const LoginPage = () => {
  const { email, password, setIsLoggedIn, reset } = useAuthStore();

  const [isFormValid, setIsFormValid] = useState(false);
  const fields = useAuthFields();

  useEffect(() => {
    setIsFormValid(LoginValidateInputs(email, password));
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("로그인 실패");
      }

      const data = await res.json();

      setIsLoggedIn(true);
      reset();
      console.log("로그인 성공", data);
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
    }
  };

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
