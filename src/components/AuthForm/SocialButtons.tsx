import { GoogleLoginUserAPI } from "@/src/app/api/auth/SocialLogin/GoogleLogin";
import { useRouter } from "next/navigation";
import React from "react";

const SocialButtons: React.FC = () => {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const response = await GoogleLoginUserAPI();

      console.log("GoogleLoginUserAPI 응답:", response);

      if (response?.success) {
        console.log("로그인 성공!");
        router.push("/");
      } else {
        console.error("로그인 실패:", response?.message);
        alert(response?.message);
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      alert("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
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
        <button
          className="flex-1 max-w-[150px] bg-gray-800 text-white py-2 rounded-full hover:bg-gray-700 transition duration-300"
          // Apple 로그인 구현
        >
          Apple 로그인
        </button>
      </div>
    </div>
  );
};

export default SocialButtons;
