import axiosClient from "./axiosClient";

const orderAPI = {
  getTodayOrder(token, data) {
    const url = "/web/order-today";
    return axiosClient.get(url, {
      headers: { Authorization: token },
    });
  },
  getWeekOrder(data, token) {
    const url = "/web/order-week";
    return axiosClient.get(url, {
      params: {
        start: data.start,
        end: data.end,
      },
      headers: { Authorization: token },
    });
  },
  getMonthOrder(data, token) {
    const url = "/web/order-month";
    return axiosClient.get(url, {
      params: {
        month: data.month,
      },
      headers: { Authorization: token },
    });
  },
  getCustomDayOrder(data, token) {
    const url = "/web/order-custom";
    return axiosClient.get(url, {
      params: {
        start: data.start,
        end: data.end,
      },
      headers: { Authorization: token },
    });
  },
};
export default orderAPI;
