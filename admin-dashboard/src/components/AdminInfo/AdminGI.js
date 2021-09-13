import { useState } from "react";
import AdminImage from "./AdminImage";
import AdminInfo from "./AdminInfo.jsx";
const AdminGI = (props) => {
  const data = JSON.parse(localStorage.getItem("user"));
  const [img, setImg] = useState(null);
  return (
    <div className="container-fluid pt-5" style={{ minHeight: 800 }}>
      <div className="row">
        <div className="col-12 d-flex justify-content-center text-center align-items-center">
          <AdminImage
            setImg={setImg}
            src={JSON.parse(localStorage.getItem("user")).url_img}
          />
        </div>
        <div className="pt-5 col-12 d-flex justify-content-center text-center align-items-center">
          <AdminInfo img={img} profile={data} />
        </div>
      </div>
    </div>
  );
};

export default AdminGI;
