"use client";

import WritePostForm from "@/src/components/PostForm/WriteForm";
import { fetchModule } from "@/src/utils/shared/fetchModule";

const WritePostPage = () => {
  const handlePostSubmit = async (title: string, content: string) => {
    await fetchModule("writePost", {
      method: "POST",
      body: JSON.stringify({ title, content }),
    });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <WritePostForm onSubmit={handlePostSubmit} />
    </div>
  );
};

export default WritePostPage;
