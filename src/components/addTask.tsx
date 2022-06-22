import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTask } from "../store/slices/taskSlice";

const AddTask: React.FC = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data: FieldValues) => {
    dispatch(addTask(data.task));
    reset();
  };

  return (
    <form className="add-task" onSubmit={handleSubmit(onSubmit)}>
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
