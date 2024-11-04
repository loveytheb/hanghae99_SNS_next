"use client";

import { useEffect, useState } from "react";
import NonAuthMain from "../components/main/guest/NonAuthMain";
import { SideBar } from "../components/common/SideBar";
import AuthMain from "../components/main/user/AuthMain";
import Cookies from "js-cookie";
import { useAuthStore } from "../store/auth/authStore";

const Home = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");

    setIsLoggedIn(!!token);
    setIsLoading(false);
  }, [setIsLoggedIn]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex">
      {isLoggedIn && <SideBar />}
      <div className={`flex-1 ${isLoggedIn ? "ml-64" : ""}`}>
        {isLoggedIn ? <AuthMain /> : <NonAuthMain />}
      </div>
    </div>
  );
};

export default Home;
