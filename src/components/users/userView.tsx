import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchUsers } from "./userSlice";

const UserView = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(fetchUsers());
    console.log("updated state", user);
  };

  return (
    <div className="flex flex-col w-fit gap-4 items-center justify-center mt-10 mx-auto ">
      <h2 className="font-bold text-2xl">list of users</h2>
      <button
        className=" text-lg border rounded-2xl p-4 bg-gray-100 "
        onClick={handleClick}
      >
        fetch users
      </button>
      {user.loading && <div>...Loading</div>}
      {!user.loading && user.error ? <div>error</div> : null}
      {!user.loading && user.user.length ? (
        <ul>
          {user.user.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default UserView;
