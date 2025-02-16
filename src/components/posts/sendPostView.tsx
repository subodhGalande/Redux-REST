import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { sendPosts } from "./sendPostSlice";

const SendPostView = () => {
  const dispatch = useAppDispatch();

  const [id, setid] = useState<number>(1);
  const [title, settitle] = useState<string>("");
  const [body, setbody] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(sendPosts({ userId: id, title, body }));
    console.log("sent post", { userId: id, title, body });

    settitle("");
    setbody("");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-5/6 flex mt-10 flex-col items-center gap-y-3 justify-center mx-auto"
      >
        <input
          type={"number"}
          onChange={(e) => setid(parseInt(e.target.value) || 1)}
          className="border"
          placeholder="enter id number"
        />
        <input
          type={"text"}
          onChange={(e) => settitle(e.target.value)}
          className="border"
          placeholder="enter title"
        />
        <input
          type={"text"}
          onChange={(e) => setbody(e.target.value)}
          className="border"
          placeholder="enter body"
        />
        <button className="p-4 border rounded-2xl mx-auto">submit post</button>
      </form>
    </>
  );
};

export default SendPostView;
