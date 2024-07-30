import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "../utils";

/* eslint-disable react/prop-types */
function SingleUser({ user }) {
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isLoading } = useMutation({
    mutationFn: () => customFetch.patch("/" + user.id),
    onSuccess: queryClient.invalidateQueries(),
  });
  return (
    <article className="single-user">
      <div>
        <p>Id: {user.id}</p>
        <p>Name: {user.name}</p>
        <p>Age: {user.age}</p>
        <p>Job: {user.job}</p>

        <button onClick={() => deleteUser()} disabled={isLoading}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default SingleUser;
