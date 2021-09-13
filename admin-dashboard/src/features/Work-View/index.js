import workAPI from "api/workviewAPI";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WorkView from "./pages/MainPage/WorkView";
import { setAllRequest, setRequestUpdate } from "./workSlice";

function WorkViewIndex() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.work.reqList);
  console.log(state);
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      const res = await workAPI.getAllRequest(token);
      console.log(res);
      dispatch(setAllRequest(res.data));
    })();
    (async () => {
      const token = localStorage.getItem("token");
      const res = await workAPI.getRequestUpdateFood(token);
      console.log(res);
      dispatch(setRequestUpdate(res.data));
    })();
  }, [dispatch]);

  return <WorkView />;
}
export default WorkViewIndex;
