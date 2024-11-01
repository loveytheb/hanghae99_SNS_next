"use client";

import AuthForm from "@/src/components/AuthForm/AuthForm";
import { useAuthStore } from "@/src/store/auth/authStore";
import React, { useEffect, useState } from "react";
import useAuthFields from "./data";
import { RegisterValidateInputs } from "@/src/utils/validationInputs";
import { fetchModule } from "@/src/utils/shared/fetchModule";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const route = useRouter();
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
      const data = await fetchModule("register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          display_name: displayName,
          message,
        }),
      });

      console.log("회원가입 성공:", data);
      reset();
      route.push("/auth/login");
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
