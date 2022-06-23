import { Key, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { getTasks, setPageSize, fetchTasks } from "store/slices/taskSlice";
import Card from "./card";

const DataGrid: React.FC = () => {
  const dispatch = useDispatch();
  const { data, error, pagination, hasMore, scrollPosition } =
    useSelector(getTasks);

  const fetchMoreData = async () => {
    dispatch(setPageSize(pagination.limit + 10));
    await dispatch(fetchTasks());
  };

  const handleScrollPosition = () => {
    if (scrollPosition) {
      window.scrollTo(0, scrollPosition);
    }
  };

  useEffect(() => {
    handleScrollPosition();
  }, [data]);

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      {data.map((item: any, key: Key | null | undefined) => (
        <Card key={key} item={item} cardKey={key} />
      ))}
    </InfiniteScroll>
  );
};

export default DataGrid;
