"use client";

import AuthForm from "@/src/components/AuthForm/AuthForm";
import { useAuthStore } from "@/src/store/auth/authStore";
import React, { useEffect, useState } from "react";
import useAuthFields from "./data";
import { RegisterValidateInputs } from "@/src/utils/validationInputs";

const RegisterPage = () => {
  const {
    name,
    email,
    password,
    confirmPassword,
    displayName,
    message,
    reset,
  } = useAuthStore();

  const [isFormValid, setIsFormValid] = useState(false);
  const fields = useAuthFields();

  useEffect(() => {
    setIsFormValid(
      RegisterValidateInputs(
        displayName,
        email,
        password,
        confirmPassword,
        message
      )
    );
  }, [name, email, password, confirmPassword, displayName, message]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          display_name: displayName,
          message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
        return;
      }

      const data = await response.json();
      console.log("회원가입 성공:", data);
      reset();
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
    }
  };

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
