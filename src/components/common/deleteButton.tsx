import { useDispatch } from "react-redux";
import {
  deleteTask,
  setScrollPosition,
  setActiveEditCard,
} from "store/slices/taskSlice";

interface DeleteButtonProps {
  id: number;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const dispatch = useDispatch();
  const handleDeleteTask = (id: number) => {
    dispatch(setScrollPosition(window.pageYOffset));
    dispatch(setActiveEditCard(null));
    dispatch(deleteTask({ id, multiDelete: false }));
  };

  return (
    <i onClick={() => handleDeleteTask(id)} className="btn fa fa-close"></i>
  );
};

export default DeleteButton;
