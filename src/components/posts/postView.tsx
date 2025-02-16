import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPosts } from "./postSlice";

const PostsView = () => {
  const posts = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(fetchPosts());
    console.log("updated posts", posts);
  };

  return (
    <>
      <div className="flex flex-col w-fit gap-4 items-center justify-center mt-10 mx-auto ">
        <h2 className="font-bold text-2xl">list of posts</h2>
        <button
          className=" text-lg border rounded-2xl p-4 bg-gray-100 "
          onClick={handleClick}
        >
          fetch posts
        </button>
        {posts.loading && <div>...Loading</div>}
        {!posts.loading && posts.error ? <div>error</div> : null}
        {!posts.loading && posts.posts.length ? (
          <ul className="space-y-4">
            {posts.posts.map((item) => (
              <li key={item.id} className="w-1/2 mx-auto">
                {item.title} {item.body}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
};

export default PostsView;
