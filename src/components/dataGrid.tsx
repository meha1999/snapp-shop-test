import { FieldValues, useForm } from "react-hook-form";

import { Key, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getTasks,
  setPageSize,
  fetchTasks,
  updateTaskStatus,
  updateTask,
  deleteTask,
} from "../store/slices/taskSlice";

const DataGrid: React.FC = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { data, loading, error, pagination, hasMore } = useSelector(getTasks);
  const [enableEdit, setEnableEdit] = useState<Key | null | undefined>();

  const handleCheckTask = (item: any) => {
    dispatch(
      updateTaskStatus({
        id: item.id,
        done: !item.done,
      })
    );
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask({ id, multiDelete: false }));
  };

  const handleEditTask = (key: Key | null | undefined) => {
    setEnableEdit(key);
  };

  const onEdit = (data: FieldValues, item: any) => {
    dispatch(
      updateTask({
        id: item.id,
        task: data.editTask,
      })
    );
    setEnableEdit(null);
  };

  const fetchMoreData = async () => {
    dispatch(setPageSize(pagination.limit + 10));
    await dispatch(fetchTasks());
  };

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      {!loading ? (
        <>
          {data.map((item: any, key: Key | null | undefined) => (
            <li
              key={key}
              className="card"
              onDoubleClick={() => handleEditTask(key)}
            >
              <input
                className="checkBox"
                type="checkbox"
                checked={item.done}
                onChange={() => handleCheckTask(item)}
              />
              <span className="text">
                {enableEdit === key ? (
                  <form onSubmit={handleSubmit((data) => onEdit(data, item))}>
                    <input
                      className="edit-input"
                      defaultValue={item.title}
                      autoFocus
                      {...register("editTask")}
                    />
                    <button className="edit-btn">
                      <i className="fa fa-pencil"></i>
                    </button>
                  </form>
                ) : (
                  <div> {`${key}  ${item.title}`}</div>
                )}
              </span>

              <i
                onClick={() => handleDeleteTask(item.id)}
                className="btn fa fa-close"
              ></i>
            </li>
          ))}
        </>
      ) : (
        <div className="loader"></div>
      )}
    </InfiniteScroll>
  );
};

export default DataGrid;
