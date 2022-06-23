import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsActive, fetchTasks } from "../src/store/slices/taskSlice";
import AddTask from "../src/components/addTask";
import DataGrid from "../src/components/dataGrid";
import Footer from "../src/components/footer";
import { Toaster } from "react-hot-toast";
import Loader from "../src/components/common/loader";

const Home: NextPage = () => {
  const router = useRouter();
  const { filter } = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    const isActive: any = filter && filter[0] === "Active" ? true : false;
    dispatch(setIsActive(isActive));
    dispatch(fetchTasks());
  }, [filter]);

  return (
    <div className={"container"}>
      <Head>
        <title>Snapp Shop Test App</title>
        <meta name="description" content="Snapp Shop Test App" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={"main"}>
        <h1 className={"title"}>ToDo APP</h1>
        <div className="container">
          <div className="content">
            <AddTask />
            <Loader component={<DataGrid />} />
          </div>
          <Footer />
        </div>
      </main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 5000,
        }}
      />
    </div>
  );
};

export default Home;
