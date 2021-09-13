import merchantAPI from "api/merchantAPI";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getToken } from "utils/Common";
import "./assets/merchantStyle.css";
import "./components/Merchant.css";
import { emptyMerchant, setMerchantByID } from "./merchantSlice";
import MainPage from "./pages/MainPage/MainPage";

function Merchant(props) {
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

export default Merchant;
