import BannerForm from "features/Banner/components/BannerForm";
import BannerTable from "features/Banner/components/BannerTable";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "features/Banner/components/Banner.css";
import bannerAPI from "api/bannerAPI";
import { initialBanner } from "features/Banner/bannerSlice";
const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      const res = await bannerAPI.getAllBanner(token);
      dispatch(initialBanner(res.data.data));
    })();
  }, [dispatch]);

  return (
    <>
      <div className="">
        <div className="row">
          <div className="col-12 " style={{ padding: "0px 0px 30px 0px" }}>
            <BannerForm />
          </div>
        </div>
        <div className="row">
          <div className="col-12" style={{ padding: "unset" }}>
            <BannerTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
