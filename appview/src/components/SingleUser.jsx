import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "../utils";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
function SingleUser({ user }) {
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: () => {
      toast.success("User Deleted");
      customFetch.delete("/" + user.id);
    },
    onSuccess: queryClient.invalidateQueries(),
  });
  return (
    <tbody>
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
    </tbody>
  );
}

export default SingleUser;
