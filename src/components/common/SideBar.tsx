"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { shouldShowSidebar } from "@/src/utils/checkRoutes";

interface SideBarProps {
  isAuthenticated: boolean;
}

export const SideBar: React.FC<SideBarProps> = ({ isAuthenticated }) => {
  const pathname = usePathname();

  if (!shouldShowSidebar(pathname, isAuthenticated)) {
    return null;
  }

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col px-4 py-6">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-2xl font-bold text-black">Tap</span>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col space-y-4 w-full">
        <a
          href="/"
          className="flex items-center space-x-4 text-gray-700 hover:text-gray-500"
        >
          <i className="fas fa-home text-xl"></i>
          <span className="text-lg font-semibold">Home</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-4 text-gray-700 hover:text-gray-500"
        >
          <i className="fas fa-bell text-xl"></i>
          <span className="text-lg font-semibold">Notifications</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-4 text-gray-700 hover:text-gray-500"
        >
          <i className="fas fa-envelope text-xl"></i>
          <span className="text-lg font-semibold">Messages</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-4 text-gray-700 hover:text-gray-500"
        >
          <i className="fas fa-bookmark text-xl"></i>
          <span className="text-lg font-semibold">Bookmarks</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-4 text-gray-700 hover:text-gray-500"
        >
          <i className="fas fa-user text-xl"></i>
          <span className="text-lg font-semibold">Profile</span>
        </a>
      </div>

      {/* Button */}
      <button className="w-full bg-black hover:bg-gray-700 text-white py-2 rounded-full font-semibold text-lg mt-4">
        게시하기
      </button>

      {/* User Profile */}
      <div className="flex items-center space-x-3 w-full pt-6 mt-auto border-t border-gray-200">
        <Image
          src="/images/defult_profile_image.png"
          alt="Profile Image"
          width={48}
          height={48}
        />
        <div className="flex-1">
          <p className="text-gray-800 font-semibold">display name</p>
          <p className="text-gray-500 text-sm">email</p>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <i className="fas fa-ellipsis-h">...</i>
        </button>
      </div>
    </div>
  );
};
