import { useState } from "react";
import Image from "next/image";

interface WritePostFormProps {
  onSubmit: (title: string, content: string) => Promise<void>;
}

const WritePostForm: React.FC<WritePostFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await onSubmit(title, content);
      setTitle("");
      setContent("");
      alert("게시글이 성공적으로 작성되었습니다!");
    } catch (error) {
      console.error("게시글 작성 중 오류가 발생했습니다.", error);
      setError("게시글 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mb-4">
      <div className="flex space-x-3">
        <Image
          src="/images/default_profile_image.png"
          alt="User Avatar"
          width={40}
          height={40}
        />
        <div className="w-full">
          <input
            className="w-full p-2 border border-gray-300 rounded-lg resize-none"
            placeholder="title"
          />
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg resize-none"
            placeholder="content"
          />
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex space-x-4 text-blue-500">
          <button>사진</button>
        </div>
        <button
          type="submit"
          className="bg-black text-white font-semibold rounded-full px-4 py-1"
        >
          Tap
        </button>
      </div>
    </form>
  );
};

export default WritePostForm;
