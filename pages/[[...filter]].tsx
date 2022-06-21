import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  setPage,
  setPageSize,
  fetchTasks,
  addTask,
  updateTaskStatus,
  deleteTask,
} from "../src/store/slices/taskSlice";

const Home: NextPage = () => {
  const router = useRouter();
  const { filter } = router.query;

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(getTasks);

  useEffect(() => {
    // dispatch(addTask());
    dispatch(fetchTasks());
  }, []);

  const handleCheckTask = (item: any) => {
    dispatch(
      updateTaskStatus({
        id: item.id,
        done: !item.done,
      })
    );
    dispatch(fetchTasks());
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
    dispatch(fetchTasks());
  };

  const handleEditTask = ()=>{
    console.log('hi')
  }
  return (
    <div className={"container"}>
      <Head>
        <title>Snapp Shop Test App</title>
        <meta name="description" content="Snapp Shop Test App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={"main"}>
        <h1 className={"title"}>ToDo APP</h1>
        {!loading ? (
          <ul className="grid">
            {data.map((item: any, key: Key | null | undefined) => (
              <li key={key} className="card" onDoubleClick={handleEditTask}>
                <input
                  type="checkbox"
                  name="vehicle1"
                  checked={item.done}
                  onClick={() => handleCheckTask(item)}
                />
                {item.title}
                <button
                  className="hide"
                  onClick={() => handleDeleteTask(item.id)}
                >
                  delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <></>
        )}
      </main>
      <footer className={"footer"}>
        Powered by{" "}
        <span className={"logo"}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </footer>
    </div>
  );
};

export default Home;
