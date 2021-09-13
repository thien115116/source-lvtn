import { React, useState } from "react";
import axios from "axios";
import { GLOBAL_VARIABLE } from "../../app.global";
const AdminInfo = (props) => {
  console.log("image", props.img);
  const data = props.profile;
  const date = new Date(data.createAt).toLocaleDateString();
  const [displayName, setdisplayName] = useState("");

  const handlerUpdate = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("full_name", displayName);
    formData.append("images", props.img);

    axios
      .post(`${GLOBAL_VARIABLE.BASE_URL}/base-admin/change-profile`, formData, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        const data = res.data.profile;
        localStorage.setItem("user", JSON.stringify(data));
        window.location.reload();
      });
  };

  return (
    <form onSubmit={handlerUpdate} style={{ minWidth: 500 }}>
      <div className="form-group row">
        <div className="col-sm-4 d-flex align-items-center">
          <span className="bold ">Your Email:</span>
        </div>
        <div className="col-sm-8">
          <input
            type="email"
            className="form-control-plaintext"
            value={data.email}
            readOnly
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-4 d-flex align-items-center">
          <span className="bold ">Full Name:</span>
        </div>
        <div className="col-sm-8">
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder={data.displayName}
            onChange={(e) => {
              setdisplayName(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-4 d-flex align-items-center">
          <span className="bold ">Join Date:</span>
        </div>
        <div className="col-sm-8">
          <input
            type="text"
            className="form-control-plaintext"
            value={date}
            readOnly
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm d-flex justify-content-center">
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </div>
        <div className="col-sm d-flex justify-content-center">
          <button type="submit" className="btn btn-warning">
            Cancle
          </button>
        </div>
      </div>
    </form>
  );
};
export default AdminInfo;
