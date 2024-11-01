import PostList from "../../posts/PostList";
import WritePostPage from "@/src/app/(layout)/posts/write/page";

const AuthMain = () => {
  return (
    <div className="w-3/5">
      <p>Home</p>
      <WritePostPage />
      <PostList />
    </div>
  );
};

export default AuthMain;
