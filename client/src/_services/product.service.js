import axios from "axios";

const fetchProducts = () => {
  return axios.get("/products");
};

export const productService = {
  fetchProducts,
};
