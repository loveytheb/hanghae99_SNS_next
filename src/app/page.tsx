"use client";

import { useEffect, useState } from "react";
import NonAuthMain from "../components/guest/NonAuthMain";
import { SideBar } from "../components/common/SideBar";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex">
      {isAuthenticated && <SideBar isAuthenticated={isAuthenticated} />}
      <div className={`flex-1 ${isAuthenticated ? "ml-64" : ""}`}>
        {isAuthenticated ? (
          <h1 className="text-2xl">로그인 전용 화면입니다.</h1>
        ) : (
          <NonAuthMain />
        )}
      </div>
    </div>
  );
};

export default Home;
