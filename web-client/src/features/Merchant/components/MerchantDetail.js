import merchantAPI from "api/merchantAPI";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { emptyMerchantSelected, setMerchantByID } from "../merchantSlice";
import MerchantData from "./MerchantData";
const MerchantDetail = () => {
  let { id_merchant } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        dispatch(emptyMerchantSelected());
        const token = localStorage.getItem("token");
        const data = id_merchant;
        const res = await merchantAPI.getMerchantByID(token, data);
        console.log("DADADA", res);
        dispatch(setMerchantByID(res.data));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch, id_merchant]);

  return <MerchantData />;
};

export default MerchantDetail;
