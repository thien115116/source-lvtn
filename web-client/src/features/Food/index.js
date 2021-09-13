import React, { useEffect } from "react";
import MainPage from "./pages/MainPage/MainPage";
import "./assets/css/food.css";
import { useDispatch } from "react-redux";
import {
  emptyMerchant,
  setMerchantByID,
} from "features/Merchant/merchantSlice";
import { getToken } from "utils/Common";
import merchantAPI from "api/merchantAPI";
function Food(props) {
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
  return <MainPage />;
}

export default Food;
