import merchantAPI from "api/merchantAPI";
import {
  emptyMerchant,
  setMerchantByID,
} from "features/Merchant/merchantSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getToken } from "utils/Common";
import MainPage from "./pages/MainPage/MainPage";
import "features/Merchant/components/Merchant.css";
function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        dispatch(emptyMerchant());
        const token = getToken();
        const res = await merchantAPI.getMerchant(token);
        dispatch(setMerchantByID(res.data));
      } catch (error) {}
    })();
  }, [dispatch]);
  return (
    <div>
      <MainPage />
    </div>
  );
}

export default Dashboard;
