"use client";

import WritePostForm from "@/src/components/PostForm/WriteForm";
import { fetchModule } from "@/src/utils/shared/fetchModule";

const WritePostPage = () => {
  const handlePostSubmit = async (
    title: string,
    content: string,
    images: File[]
  ) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      for (const image of images) {
        formData.append("images", image); // 각 이미지 파일을 FormData에 추가
      }

      console.log("게시글 데이터:", formData);

      const data = await fetchModule("writePost", {
        method: "POST",
        body: formData,
      });
      console.log("게시글 작성 성공:", data);
      alert("게시글이 성공적으로 작성되었습니다!");
    } catch (error) {
      console.error("게시글 작성 중 오류가 발생했습니다.", error);
      if (error instanceof Error) {
        alert(`오류: ${error.message}`);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <WritePostForm onSubmit={handlePostSubmit} />
    </div>
  );
};

export default WritePostPage;
