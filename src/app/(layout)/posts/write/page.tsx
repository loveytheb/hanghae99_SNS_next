"use client";

import WritePostForm from "@/src/components/PostForm/WriteForm";
import { fetchModule } from "@/src/utils/shared/fetchModule";

const WritePostPage = () => {
  const handlePostSubmit = async (title: string, content: string) => {
    try {
      const data = await fetchModule("writePost", {
        method: "POST",
        body: { title, content },
      });
      console.log("게시글 작성 성공:", data);
    } catch (error) {
      console.error("게시글 작성 중 오류가 발생했습니다.", error);
      throw error;
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <WritePostForm onSubmit={handlePostSubmit} />
    </div>
  );
};

export default WritePostPage;
