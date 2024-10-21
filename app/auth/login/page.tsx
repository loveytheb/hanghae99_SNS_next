"use client";

import { loginUserAPI } from "@/app/api/auth/login";
import AuthForm from "@/app/components/AuthForm/AuthForm";
import { isValidEmail, isValidPassword } from "@/app/utils/supabase/validation";
import React, { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!isValidEmail(email)) {
        throw new Error("유효하지 않는 이메일 형식입니다.");
      } else if (!isValidPassword(password)) {
        throw new Error("유효하지 않는 비밀번호 형식입니다.");
      }

      await loginUserAPI({ email, password });

      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthForm
      title="TAP 로그인하기"
      fields={[
        {
          placeholder: "이메일",
          id: "email",
          type: "email",
          value: email,
          onChange: (e) => setEmail(e.target.value),
        },
        {
          placeholder: "비밀번호",
          id: "password",
          type: "password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
        },
      ]}
      buttonLabel="로그인하기"
      onSubmit={handleSubmit}
      showSocialButtons={true}
    />
  );
};

export default Page;
