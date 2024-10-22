"use client";

import { useParams } from "next/navigation";

const MyPage = () => {
  const { userId } = useParams();

  return (
    <div>
      <h1>{userId}님의 마이페이지</h1>
      {/* 마이페이지 내용 */}
    </div>
  );
};

export default MyPage;
