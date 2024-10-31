"use client";

import { useEffect, useState } from "react";
import { SideBar } from "../common/SideBar";
import Cookies from "js-cookie";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-screen-lg mx-auto gap-x-8">
        {isAuthenticated && (
          <div className="w-64">
            <SideBar isAuthenticated={isAuthenticated} />
          </div>
        )}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
