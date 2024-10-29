"use client";

import { useEffect, useState } from "react";
import NonAuthMain from "../components/guest/NonAuthMain";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    setIsAuthenticated(!!token); // 토큰이 있을 경우 인증 상태 설정
    setIsLoading(false); // 로딩이 끝났음을 설정
  }, []);

  if (isLoading) {
    return null; // 로딩 중에는 아무것도 보여주지 않음
  }

  return (
    <>{isAuthenticated ? <>로그인 전용 화면 입니다.</> : <NonAuthMain />}</>
  );
};

export default Home;
