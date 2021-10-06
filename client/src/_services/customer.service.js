import axios from "axios";

const fetchCustomers = (params) => {
  return axios.get("/customers", { params });
};

const createCustomer = (data) => {
  return axios.post("/customers", data);
};

export const customerService = {
  fetchCustomers,
  createCustomer,
};
