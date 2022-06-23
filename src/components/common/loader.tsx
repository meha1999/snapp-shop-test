import React from "react";
import { useSelector } from "react-redux";
import { getTasks } from "../../store/slices/taskSlice";

const Loader: React.FC<any> = ({ component }) => {
  const { loading } = useSelector(getTasks);
  return <>{!loading ? component : <div className="loader"></div>}</>;
};

export default Loader;
