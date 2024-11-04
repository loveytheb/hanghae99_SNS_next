import { useState } from "react";
import Image from "next/image";
import { usePostStore } from "@/src/store/post/postStore";

interface WritePostFormProps {
  onSubmit: (title: string, content: string, images: File[]) => Promise<void>;
}

const MAX_FILE_SIZE = 10485760; // 10MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/gif"];

const WritePostForm: React.FC<WritePostFormProps> = ({ onSubmit }) => {
  const { title, content, images, setTitle, setContent, setImages, reset } =
    usePostStore();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    for (const image of images) {
      if (image.size > MAX_FILE_SIZE) {
        setError("모든 파일이 10MB를 초과할 수 없습니다.");
        return;
      }
      if (!ALLOWED_MIME_TYPES.includes(image.type)) {
        setError("허용되지 않는 파일 형식입니다. JPEG, PNG, GIF만 가능합니다.");
        return;
      }
    }

    try {
      await onSubmit(title, content, images);
      reset();
    } catch (error) {
      console.error("게시글 작성 중 오류가 발생했습니다.", error);
      setError("게시글 작성 중 오류가 발생했습니다.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        alert("파일 크기가 10MB를 초과할 수 없습니다.");
        return false;
      }
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        alert("허용되지 않는 파일 형식입니다. JPEG, PNG, GIF만 가능합니다.");
        return false;
      }
      return true;
    });
    setImages(validFiles); // 선택된 파일을 상태에 저장
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg resize-none"
            placeholder="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex space-x-4 text-blue-500">
          <label className="cursor-pointer text-blue-500">
            사진
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              multiple
            />
          </label>
          {images.length > 0 && (
            <div>
              {images.map((image) => (
                <p key={image.name} className="text-gray-500">
                  {image.name}
                </p>
              ))}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-black text-white font-semibold rounded-full px-4 py-1"
        >
          Tap
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default WritePostForm;
