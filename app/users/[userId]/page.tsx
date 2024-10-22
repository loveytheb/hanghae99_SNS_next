"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const UserPage = () => {
  const { userId } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      router.push(`/mypage/${userId}`);
    }
  }, [userId]);

  return (
    <div>
      <p>User ID: {userId}</p>
    </div>
  );
};

export default UserPage;
