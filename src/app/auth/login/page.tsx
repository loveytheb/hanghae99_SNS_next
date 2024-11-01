"use client";

import AuthForm from "@/src/components/AuthForm/AuthForm";
import { useAuthStore } from "@/src/store/auth/authStore";
import React, { useEffect, useState } from "react";
import useAuthFields from "./data";
import { LoginValidateInputs } from "@/src/utils/validationInputs";
import { useRouter } from "next/navigation";
import { fetchModule } from "@/src/utils/shared/fetchModule";

const LoginPage = () => {
  const route = useRouter();
  const { email, password, setIsLoggedIn, reset } = useAuthStore();

  const [isFormValid, setIsFormValid] = useState(false);
  const fields = useAuthFields();

  useEffect(() => {
    setIsFormValid(LoginValidateInputs(email, password));
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await fetchModule("login", {
        method: "POST",
        body: { email, password },
      });

      console.log("로그인 정보:", {
        display_name: data.display_name,
        email: data.email,
        id: data.id,
      });

      setIsLoggedIn(true);
      reset();
      route.push("/");
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
