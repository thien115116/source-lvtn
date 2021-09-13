import GoongMap from "features/Location/pages/MainPage/GoongMap";
import { useEffect } from "react";
import merchantAPI from "api/merchantAPI";
import { initialLocation } from "./locationSlice";
import { useDispatch } from "react-redux";
function Location() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      const res = await merchantAPI.getAllMerchant(token);
      console.log(res.data);
      dispatch(initialLocation(res.data));
    })();
  }, [dispatch]);
  return <GoongMap />;
}
export default Location;
