import Image from "next/image";

const PostList = () => (
  <div className="border-t border-gray-300 py-4">
    <div className="flex space-x-3">
      <Image
        src="https://via.placeholder.com/40"
        alt="User Avatar"
        width={40}
        height={40}
      />
      <div>
        <p className="text-gray-800 font-semibold">
          display_name <span className="text-gray-500">email</span>
        </p>
        <p>title</p>
        <p>content</p>
        <div className="flex justify-between text-gray-500 text-sm">
          <span>리트윗</span>
          <span>댓글</span>
          <span>좋아요</span>
        </div>
      </div>
    </div>
  </div>
);

export default PostList;
