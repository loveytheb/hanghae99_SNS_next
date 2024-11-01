import Image from "next/image";

const WritePost = () => {
  return (
    <div className="w-full mb-4">
      <div className="flex space-x-3">
        <Image
          src="https://via.placeholder.com/40"
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
        <button className="bg-black text-white font-semibold rounded-full px-4 py-1">
          Tap
        </button>
      </div>
    </div>
  );
};

export default WritePost;
