import { Key } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, setActiveEditCard } from "../store/slices/taskSlice";
import CheckBox from "./common/checkBox";

import DeleteButton from "./common/deleteButton";
import EditTask from "./editTask";

interface CardProps {
  cardKey: Key | null | undefined;
  item: any;
}

const Card: React.FC<CardProps> = ({ cardKey, item }) => {
  const dispatch = useDispatch();
  const { activeEditCard } = useSelector(getTasks);

  const handleEditTask = (cardKey: Key | null | undefined) => {
    dispatch(setActiveEditCard(cardKey));
  };

  return (
    <li
      className="card"
      onDoubleClick={() => handleEditTask(cardKey)}
    >
      <CheckBox item={item} />
      <span className="text">
        {activeEditCard === cardKey ? <EditTask item={item} /> : item.title}
      </span>
      <DeleteButton id={item.id} />
    </li>
  );
};

export default Card;
