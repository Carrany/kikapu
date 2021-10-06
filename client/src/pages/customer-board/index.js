import { LazyLoading } from "_components/Loading";
import Loadable from "react-loadable";

const CustomerBoard = Loadable({
  loader: () => import("./components/CustomerBoard"),
  loading: LazyLoading,
});

export const routes = [
  {
    path: "/customer-board",
    exact: true,
    component: CustomerBoard,
  },
];
