import axiosClient from "./axiosClient";

const bannerAPI = {
  getAllBanner(token) {
    const url = "/base-admin/banner";
    return axiosClient(url, { headers: { Authorization: token } });
  },
  addBanner(token, data) {
    const url = "/base-admin/create-banner";
    return axiosClient.post(url, data, { headers: { Authorization: token } });
  },
  delBanner(token, data) {
    const url = "/base-admin/delete-banner";
    return axiosClient.put(url, data, {
      headers: {
        Authorization: token,
      },
    });
  },
};
export default bannerAPI;
