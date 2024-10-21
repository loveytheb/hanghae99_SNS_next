"use client";

import { registerUserAPI } from "@/app/api/auth/register";
import AuthForm from "@/src/components/AuthForm/AuthForm";
import {
  isValidEmail,
  isValidPassword,
  isValidMessage,
  isValidDisplayname,
} from "@/src/utils/supabase/validation";
import React, { useState } from "react";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!isValidDisplayname(displayName)) {
        throw new Error("2글자 이상 입력해주세요.");
      } else if (!isValidEmail(email)) {
        throw new Error("유효하지 않는 이메일 형식입니다.");
      } else if (!isValidPassword(password)) {
        throw new Error("유효하지 않는 비밀번호 형식입니다.");
      } else if (!isValidMessage(message)) {
        throw new Error("10글자 이상 입력해주세요.");
      }

      if (password !== confirmPassword) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }

      await registerUserAPI({
        name,
        email,
        password,
        display_name: displayName,
        message,
      });

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setDisplayName("");
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthForm
      title="TAP 가입하기"
      fields={[
        {
          placeholder: "이름",
          id: "name",
          type: "text",
          value: name,
          onChange: (e) => setName(e.target.value),
        },
        {
          placeholder: "닉네임",
          id: "displayName",
          type: "text",
          value: displayName,
          onChange: (e) => setDisplayName(e.target.value),
        },
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
        {
          placeholder: "비밀번호 확인",
          id: "confirmPassword",
          type: "password",
          value: confirmPassword,
          onChange: (e) => setConfirmPassword(e.target.value),
        },
        {
          placeholder: "인사말",
          id: "message",
          type: "text",
          value: message,
          onChange: (e) => setMessage(e.target.value),
        },
      ]}
      buttonLabel="가입하기"
      onSubmit={handleSubmit}
    />
  );
};

export default Page;
