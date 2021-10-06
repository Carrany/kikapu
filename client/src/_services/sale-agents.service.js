import axios from "axios";

const fetchSalesAgents = () => {
  return axios.get("/sales-agents");
};

export const salesAgentService = {
  fetchSalesAgents,
};
