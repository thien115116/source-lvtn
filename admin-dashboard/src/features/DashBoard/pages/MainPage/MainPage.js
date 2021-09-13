import { useEffect } from "react";
import { DashboardContent } from "features/DashBoard/components/DashBoardContent";

import { useDispatch } from "react-redux";
import { setTotalOrder } from "features//DashBoard/dashboardSlice";
import dashboardAPI from "api/dashboardAPI";

export default function MainPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await dashboardAPI.getAllOrder(token);
        dispatch(setTotalOrder(res.data));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);
  return (
    <div className="main">
      <div className="main-content">
        <DashboardContent />
      </div>
    </div>
  );
}
