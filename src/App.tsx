import React from "react";

import UserView from "./components/users/userView";
import PostsView from "./components/posts/postView";
import SendPostView from "./components/posts/sendPostView";

function App() {
  return (
    <>
      <SendPostView />
      <PostsView />
      <UserView />
    </>
  );
}

export default App;
