import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Post } from "@/src/types/postType";
import { fetchModule } from "@/src/utils/shared/fetchModule";

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      const data = await fetchModule("listPost", {});

      // 최신순으로 정렬
      const sortedData = data.sort((a: Post, b: Post) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });

      setPosts(sortedData);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="border-t border-gray-300 py-4">
      {posts.map((post) => (
        <div key={post.id} className="flex space-x-3 mb-4">
          <div className="w-10 h-10 overflow-hidden rounded-full">
            <Image
              src={
                post.users_info?.profile_image ||
                "/images/default_profile_image.png"
              }
              alt="User Avatar"
              layout="responsive"
              width={40}
              height={40}
            />
          </div>
          <div>
            <p className="text-gray-800 font-semibold">
              {post.display_name}
              <span className="text-gray-500">{post.email}</span>
            </p>
            <p className="font-semibold">{post.title}</p>
            <p>{post.content}</p>
            <div className="flex justify-between text-gray-500 text-sm">
              <span>리트윗</span>
              <span>댓글</span>
              <span>좋아요</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
