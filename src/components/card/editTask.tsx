import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  updateTask,
  setScrollPosition,
  setActiveEditCard,
} from "store/slices/taskSlice";

interface EditTaskProps {
  item: any;
}
const EditTask: React.FC<EditTaskProps> = ({ item }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onEdit = (data: FieldValues, item: any) => {
    dispatch(setScrollPosition(window.pageYOffset));
    dispatch(
      updateTask({
        id: item.id,
        task: data.editTask,
      })
    );
    dispatch(setActiveEditCard(null));
  };

  useEffect(() => {
    errors.editTask && toast.error(`Is ${errors?.editTask?.type}`);
  }, [errors]);

  return (
    <form onSubmit={handleSubmit((data) => onEdit(data, item))}>
      <input
        className="edit-input"
        defaultValue={item.title}
        autoFocus
        {...register("editTask", { required: true, minLength: 3 })}
      />
      <button className="edit-btn">
        <i className="fa fa-pencil"></i>
      </button>
    </form>
  );
};

export default EditTask;
