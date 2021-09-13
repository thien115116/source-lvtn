import requestAPI from "api/requestAPI";
import Select from "react-select";

const RequestUpdateFood = ({ req }) => {
  let option = [
    {
      label: "⏰ Penning",
      value: "Penning",
    },
    {
      label: "✔️ Done",
      value: "Done",
    },
  ];
  const handleChange = (e) => {
    (async () => {
      try {
        let data = {
          id_request: req.id_request,
          state: e.value,
        };
        const token = localStorage.getItem("token");
        const res = await requestAPI.changeStateRequest(data, token);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    })();
  };
  return (
    <div>
      <div className="row mb-2 mt-2">
        <div className="col-6">
          <div style={{ padding: "10px 0px" }}>
            <span className="bold">Type: </span>
            <span className="label_ASAP">{"Merchant"}</span> {" || "}
            <span className="bold">Label: </span>
            <span className="label_online">{"Cập nhật món"}</span>
          </div>
        </div>
        <div className="col-6">
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={{
              label: req.state === "Penning" ? "⏰ Penning" : "✔️ Done",
              value: req.state,
            }}
            isDisabled={false}
            isLoading={false}
            isClearable={false}
            isRtl={false}
            isSearchable={false}
            name="state"
            options={option}
            onChange={handleChange}
          />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-9">
          <div>
            <span style={{ color: "red", display: "inline-block" }}>*</span>
            <span style={{ color: "#999" }}>
              {" "}
              Bạn nhận được yêu cầu xác nhận cập nhật thông tin món ăn từ đối
              tác.
            </span>
          </div>
        </div>
        <div className="col-3" style={{ padding: "unset" }}>
          <div className="action-create-area d-flex align-items-center justify-content-center">
            <div className="d-flex justify-content-center align-items-center">
              <a href={`/staff/update-food/${req.id_request}`}>
                <button
                  href
                  style={{ marginTop: "unset" }}
                  type="button"
                  className="btn  btn_create-food"
                >
                  Xử lý
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestUpdateFood;
