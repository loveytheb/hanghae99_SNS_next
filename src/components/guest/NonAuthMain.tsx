"use client";

import { useRouter } from "next/navigation";

const NonAuthMain = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-7xl justify-between">
        {/* 왼쪽 영역 */}
        <div className="flex items-center justify-center w-1/2">
          <h1
            className="font-extrabold tracking-tight"
            style={{ fontSize: "11rem" }}
          >
            Tap
          </h1>
        </div>

        {/* 오른쪽 영역 */}
        <div className="w-1/2 flex flex-col items-center justify-center space-y-4">
          <h2 className="text-3xl font-semibold mb-6">지금 가입하세요</h2>

          <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 w-72 rounded-full shadow-lg text-lg transition">
            Google 계정으로 가입하기
          </button>
          <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 w-72 rounded-full shadow-lg text-lg transition">
            Apple 계정으로 가입하기
          </button>
          <div className="text-gray-400">
            --------------------- 또는 ---------------------
          </div>
          <button
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 w-72 rounded-full shadow-lg text-lg transition"
            onClick={() => router.push("/auth/register")}
          >
            계정 만들기
          </button>
          <div className="mt-6 text-gray-500">이미 Tag에 가입하셨나요?</div>
          <button
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 w-72 rounded-full shadow-lg text-lg transition"
            onClick={() => router.push("/auth/login")}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default NonAuthMain;
