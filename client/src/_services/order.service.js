import axios from "axios";

const fetchOrders = (params) => {
  return axios.get("/orders", { params });
};

const createOrder = (data) => {
  return axios.post("/orders", data);
};

export const orderService = {
  fetchOrders,
  createOrder,
};
