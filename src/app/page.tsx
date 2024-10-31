"use client";

import { useEffect, useState } from "react";
import NonAuthMain from "../components/main/guest/NonAuthMain";
import { SideBar } from "../components/common/SideBar";
import AuthMain from "../components/main/user/AuthMain";
import Cookies from "js-cookie";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    console.log("Token from Cookies:", token);
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
        {isAuthenticated ? <AuthMain /> : <NonAuthMain />}
      </div>
    </div>
  );
};

export default Home;
