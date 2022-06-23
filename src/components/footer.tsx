import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, deleteTask, fetchTasks } from "../store/slices/taskSlice";

const Footer: React.FC = () => {
  const router = useRouter();
  const { data, isActive } = useSelector(getTasks);
  const [countLeft, setCountLeft] = useState<number>(0);

  const dispatch = useDispatch();
  useEffect(() => {
    const count = data.filter((item: { done: boolean }) => !item.done);
    setCountLeft(count.length);
  }, [data]);

  const handleClearCompleted = () => {
    const completed = data.filter((item: { done: boolean }) => item.done);
    completed.map((item: { id: any }) => {
      dispatch(deleteTask({ id: item.id, multiDelete: true }));
    });
    dispatch(fetchTasks());
  };

  return (
    <div className="options">
      <div className="counter">{`${countLeft} items left`}</div>
      <div className="filters">
        <div
          className={`block ${!isActive && "bold"}`}
          onClick={() => router.push("/")}
        >
          All
        </div>
        <div
          className={`block ${isActive && "bold"}`}
          onClick={() => router.push("/Active")}
        >
          Active
        </div>
      </div>
      <div className="clearBtn">
        <button onClick={handleClearCompleted}>Clear Completed</button>
      </div>
    </div>
  );
};

export default Footer;
