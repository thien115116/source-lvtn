import axios from "axios";
import { useState } from "react";
import "./Search.css";
import { GLOBAL_VARIABLE } from "app.global";
import { useRouteMatch } from "react-router-dom";

export default function SearchField(props) {
  let { url } = useRouteMatch();
  const token = localStorage.getItem("token");
  const [keySearch, setKeySearch] = useState("");
  const [data, setData] = useState([]);
  function handleSubmit(e) {
    if (e.key === "Enter") {
      let config = {
        headers: { Authorization: token },
        params: {
          keyword: keySearch,
        },
      };
      axios
        .get(`${GLOBAL_VARIABLE.BASE_URL}/base-admin/search-merchant`, config)
        .then((res) => {
          setData(res.data);
        });
    }
  }

  const handleChange = (e) => {
    setKeySearch(e.target.value);
  };

  return (
    <div>
      <div style={{ padding: "10px 20px" }}>
        <input
          type="text"
          placeholder="Search"
          value={keySearch}
          className="form-control"
          onKeyDown={handleSubmit}
          onChange={handleChange}
        />
        <div style={{ paddingTop: 10 }}>
          <h3>
            Kết quả tìm kiếm cho:
            <span
              style={{
                marginLeft: "1%",
                fontSize: 30,
                fontWeight: 500,
                color: "black",
              }}
            >
              `{keySearch} `
              <span
                style={{
                  marginLeft: "1%",
                  fontSize: 30,
                  fontWeight: 500,
                  color: "gray",
                }}
              >
                {data.length} kết quả
              </span>
            </span>
          </h3>
        </div>
        <table style={{ minWidth: "unset" }} className="table table-striped">
          <thead>
            <tr className="text-center">
              <td>STT</td>
              <td>Tên Merchant</td>

              <td>Sở hữu</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{data.name_merchant}</td>
                  <td>{data.athor}</td>
                  <td>
                    {/* href={`${url}/${data.id_merchant} */}
                    <a href={`${url}/${data.id_merchant}`}>
                      <button type="button" className="btn btn-primary">
                        Detail
                      </button>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
