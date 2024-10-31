import PostList from "../../posts/PostList";
import WritePost from "../../posts/WritePost";

const AuthMain = () => {
  return (
    <div className="w-3/5">
      <p>Home</p>
      <WritePost />
      <PostList />
    </div>
  );
};

export default AuthMain;
