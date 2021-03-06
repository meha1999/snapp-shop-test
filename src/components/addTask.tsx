import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { addTask } from "store/slices/taskSlice";

const AddTask: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data: FieldValues) => {
    dispatch(addTask(data.task));
    reset();
  };

  const onError = () => {
    toast.error(
      `Is ${errors?.task?.type} ${errors?.task?.type === "minLength" ? 3 : ""}`
    );
  };

  return (
    <form className="add-task" onSubmit={handleSubmit(onSubmit, onError)}>
      <input
        className="input"
        placeholder="What needs to be done?"
        {...register("task", { required: true, minLength: 3 })}
      />
      <button className="btn">Add Task</button>
    </form>
  );
};

export default AddTask;
