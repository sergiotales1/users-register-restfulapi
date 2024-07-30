import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "../utils";

/* eslint-disable react/prop-types */
function SingleUser({ user }) {
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: () => customFetch.patch("/" + user.id),
    onSuccess: queryClient.invalidateQueries(),
  });
  return (
    <tr className="user-data">
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.job}</td>
      <td>{user.age}</td>
      <td>
        <button onClick={deleteUser} disabled={isPending}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default SingleUser;
