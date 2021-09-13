import axiosClient from "./axiosClient";

const commonAPI = {
  signIn(data) {
    const url = "/users/mcsign-in";
    return axiosClient.post(url, data);
  },
};
export default commonAPI;
