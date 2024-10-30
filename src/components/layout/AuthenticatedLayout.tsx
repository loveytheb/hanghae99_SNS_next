"use client";

import { useEffect, useState } from "react";
import { SideBar } from "../common/SideBar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="flex">
      {isAuthenticated && <SideBar isAuthenticated={isAuthenticated} />}
      <main className={`flex-1 ${isAuthenticated ? "ml-64" : ""}`}>
        {children}
      </main>
    </div>
  );
}
