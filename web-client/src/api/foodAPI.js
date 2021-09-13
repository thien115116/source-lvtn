import axiosClient from "./axiosClient";

const foodAPI = {
  deleteFood(token, data) {
    const url = "/web/delete-food";
    return axiosClient.delete(url, {
      params: {
        id_product: data,
      },
      headers: { Authorization: token },
    });
  },
  updateFood(token, data) {
    const url = "/products/sent-update";
    return axiosClient.post(url, data, {
      headers: { Authorization: token },
    });
  },
};
export default foodAPI;
