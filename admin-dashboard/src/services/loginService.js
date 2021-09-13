import axios from "axios";
import { GLOBAL_VARIABLE } from "../app.global";
import { setUserSession } from "../Utils/Common";
const formLoginSubmit = (body, props) => {
  axios
    .post(`${GLOBAL_VARIABLE.BASE_URL}/base-admin/sign-in`, body)
    .then((res) => {
      setUserSession(res.data.token, res.data.user);
      var role = null;
      if (localStorage.getItem("user") !== null) {
        role = JSON.parse(localStorage.getItem("user")).role;
        console.log(role);
      }
      if (role === 2) {
        props.history.push("/");
      } else if (role === 1) {
        props.history.push("/staff");
      }
    })
    .catch((error) => {
      alert("Sai tài khoản hoặc mật khẩu, vui lòng kiểm tra kỹ thông tin");
    });
};

export default formLoginSubmit;
