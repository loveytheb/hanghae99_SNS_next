import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Post } from "@/src/types/postType";
import { fetchModule } from "@/src/utils/shared/fetchModule";

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchPosts = async (pageParam: number) => {
    if (loading || !hasMore) return;

    try {
      const data = await fetchModule("listPost", {
        body: { page: String(pageParam) },
      });

      const sortedData = data.sort((a: Post, b: Post) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });

      setPosts((prevPosts) => {
        const uniquePosts = new Map();
        [...prevPosts, ...sortedData].forEach((post) => {
          uniquePosts.set(post.id, post);
        });
        return Array.from(uniquePosts.values());
      });

      if (data.length === 0) {
        setHasMore(false);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && hasMore) {
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "100px",
      threshold: 1.0,
    });

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [handleObserver]);

  if (loading && posts.length === 0) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="border-t border-gray-300 py-4">
      <div className="max-h-[850px] overflow-y-auto">
        {posts.map((post) => (
          <div key={post.id} className="flex space-x-3 mb-4">
            <div className="w-10 h-10 overflow-hidden rounded-full">
              <Image
                src={
                  post.users_info?.profile_image ||
                  "/images/default_profile_image.png"
                }
                alt="User Avatar"
                priority
                width={40}
                height={40}
              />
            </div>
            <div>
              <p className="text-gray-800 font-semibold">{post.display_name}</p>
              <p className="font-semibold">{post.title}</p>
              {post.photo_urls.map((url, index) => (
                <Image
                  key={index}
                  src={url}
                  alt={`Post Image ${index + 1}`}
                  width={500}
                  height={300}
                />
              ))}
              <div className="flex justify-between text-gray-500 text-sm">
                <span>리트윗</span>
                <span>댓글</span>
                <span>좋아요</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div ref={loadMoreRef} style={{ height: 1 }} />
      <div className="text-center py-4" style={{ minHeight: "40px" }}>
        {loading && posts.length > 0 && hasMore ? "Loading more..." : null}
      </div>
      {!hasMore && (
        <p className="text-center py-4">더 이상 데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default PostList;
