import axiosClient from "./axiosClient";

const requestAPI = {
  changeStateRequest(data, token) {
    const url = "/base-admin/request/change-state";
    return axiosClient.post(url, data, { headers: { Authorization: token } });
  },
};
export default requestAPI;
