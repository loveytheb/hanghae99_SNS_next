import { useEffect } from "react";
import { GoogleLoginUserAPI } from "@/app/api/auth/socialLogin";
import React from "react";
import { useRouter } from "next/navigation";

const SocialButtons: React.FC = () => {
  const route = useRouter();

  useEffect(() => {
    const fetchGoogleAuthListener = async () => {
      try {
        const response = await fetch("/api/auth");
        const data = await response.json();
        console.log("Auth listener response:", data.message);
        route.push("/auth/login");
      } catch (error) {
        console.error("Error fetching Google Auth Listener:", error);
      }
    };
    fetchGoogleAuthListener();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const response = await GoogleLoginUserAPI();
      console.log("GoogleLoginUserAPI 응답:", response);
      if (!response.success) {
        console.error("로그인 실패:", response.message);
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-4 w-full">
      <p className="text-gray-500 mb-2">------ or ------</p>
      <div className="flex flex-row items-center justify-center space-x-2 w-full">
        <button
          className="flex-1 max-w-[150px] bg-blue-600 text-white py-2 rounded-full hover:bg-blue-500 transition duration-300"
          onClick={handleGoogleLogin}
        >
          Google 로그인
        </button>
        <button className="flex-1 max-w-[150px] bg-gray-800 text-white py-2 rounded-full hover:bg-gray-700 transition duration-300">
          Apple 로그인
        </button>
      </div>
    </div>
  );
};

export default SocialButtons;
