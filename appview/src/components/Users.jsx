import { useQuery } from "@tanstack/react-query";
import SingleUser from "./SingleUser";
import customFetch from "../utils";

function Users() {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () => customFetch.get("/"),
    onError: () => console.log("errror"),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>There was an error</p>;
  return (
    <div>
      <div className="users-container">
        <table className="users-table">
          <thead>
            <tr className="users-header">
              <th>id</th><th>name</th><th>job</th><th>age</th>
            </tr>
          </thead>
          {data.data.usersList.map((user) => {
            return <SingleUser key={user.id} user={user} />;
          })}
        </table>
      </div>
    </div>
  );
}

export default Users;
