import { useQuery } from "@tanstack/react-query";
import SingleUser from "./SingleUser";
import customFetch from "../utils";

function Users() {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () => customFetch.get("/"),
    onSuccess: () => console.log("fetched: " + data),
    onError: () => console.log("errror"),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>There was an error</p>;
  return (
    <div>
      <h1>Users:</h1>
      {data?.data?.usersList.map((user) => {
        return <SingleUser key={user.id} user={user} />;
      })}
    </div>
  );
}

export default Users;
