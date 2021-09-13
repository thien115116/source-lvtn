import axiosClient from "./axiosClient";

const merchantAPI = {
  getMerchant(token) {
    const url = "/web/merchant";
    return axiosClient.get(url, { headers: { Authorization: token } });
  },
  getTagOfProduct(token, data) {
    const url = `/web/tag-product`;
    return axiosClient.get(url, {
      params: {
        id_product: data,
      },
      headers: { Authorization: token },
    });
  },
  getTagOfMerchant(token) {
    const url = `/tags/all`;
    return axiosClient.get(url, {
      headers: { Authorization: token },
    });
  },
  getTopingOfFood(token, data) {
    const url = `/web/get-topping`;
    return axiosClient.get(url, { headers: { Authorization: token } });
  },
  getAttByType(token, data) {
    const url = `/web/att/${data}`;
    return axiosClient.get(url, {
      headers: { Authorization: token },
    });
  },
  updateHourOpen(token, data) {
    const url = `/web/update-hour`;
    return axiosClient.post(url, data, {
      headers: { Authorization: token },
    });
  },
};
export default merchantAPI;
