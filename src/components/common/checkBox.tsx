import { useDispatch } from "react-redux";
import {
  updateTaskStatus,
  setScrollPosition,
} from "../../store/slices/taskSlice";

interface CheckBoxProps {
  item: any;
}

const CheckBox: React.FC<CheckBoxProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleChangeTaskStaus = (item: any) => {
    dispatch(setScrollPosition(window.pageYOffset));
    dispatch(
      updateTaskStatus({
        id: item.id,
        done: !item.done,
      })
    );
  };

  return (
    <input
      className="checkBox"
      type="checkbox"
      checked={item.done}
      onChange={() => handleChangeTaskStaus(item)}
    />
  );
};

export default CheckBox;
