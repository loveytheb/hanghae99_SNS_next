"use client";

import { useEffect, useState } from "react";
import NonAuthMain from "../components/main/guest/NonAuthMain";
import { SideBar } from "../components/common/SideBar";
import AuthMain from "../components/main/user/AuthMain";

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
    <div className="flex justify-center">
      <div className="flex w-full max-w-screen-lg mx-auto gap-x-8">
        {isAuthenticated && (
          <div className="w-64">
            <SideBar isAuthenticated={isAuthenticated} />
          </div>
        )}
        <main className="flex-1">
          {isAuthenticated ? <AuthMain /> : <NonAuthMain />}
        </main>
      </div>
    </div>
  );
};

export default Home;
