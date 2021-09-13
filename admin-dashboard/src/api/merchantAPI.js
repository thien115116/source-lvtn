import axiosClient from "./axiosClient";

const merchantAPI = {
  getTopMerchant(token) {
    const url = "/base-admin/get-top-merchant";
    return axiosClient.get(url, { headers: { Authorization: token } });
  },
  getAllMerchant(token) {
    const url = "/base-admin/get-all-merchant";
    return axiosClient.get(url, { headers: { Authorization: token } });
  },
  getMerchantByID(token, data) {
    const url = `/base-admin/merchant/${data}`;
    return axiosClient.get(url, {
      headers: { Authorization: token },
    });
  },
  getTagOfProduct(token, data) {
    const url = `/base-admin/tag-product`;
    return axiosClient.get(url, {
      params: {
        id_product: data,
      },
      headers: { Authorization: token },
    });
  },
  getAttByType(token, data) {
    const url = `/base-admin/att`;
    return axiosClient.get(url, {
      params: {
        type: data.type,
        id_merchant: data.id_merchant,
      },
      headers: { Authorization: token },
    });
  },
  getReqFromMerchant(token) {
    const url = `/base-admin/get-request-from-merchant`;
    return axiosClient.get(url, {
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
    const url = `/base-admin/get-toping`;
    return axiosClient.get(url, {
      params: {
        id_merchant: data,
      },
      headers: { Authorization: token },
    });
  },
  getBrand(token) {
    const url = `/base-admin/brand`;
    return axiosClient.get(url, {
      headers: { Authorization: token },
    });
  },
  getBrandDetail(data, token) {
    const url = `/base-admin/brand/${data}`;
    return axiosClient.get(url, {
      headers: { Authorization: token },
    });
  },
  getMerchantNotWorking(token) {
    const url = `/base-admin/merchant-not-work`;
    return axiosClient.get(url, {
      headers: { Authorization: token },
    });
  },
  deleteMerchantFromBrand(data, token) {
    const url = `/base-admin/merchant/brand/${data}`;
    return axiosClient.delete(url, {
      headers: { Authorization: token },
    });
  },
};

export default merchantAPI;
