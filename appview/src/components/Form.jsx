import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import customFetch from "../utils";

function Form() {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [age, setAge] = useState("");

  const queryClient = useQueryClient();

  const { mutate: createUser, isPending } = useMutation({
    mutationFn: () => customFetch.post("/", { name, job, age }),
    onSuccess: () => {
      setName("");
      setAge("");
      setJob("");
      queryClient.invalidateQueries();
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
  };
  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Job:
          <input
            type="text"
            name="job"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
        </label>
        <label>
          Age:
          <input
            type="text"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <button type="submit" disabled={isPending}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
