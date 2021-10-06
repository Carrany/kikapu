import { LazyLoading } from "_components/Loading";
import Loadable from "react-loadable";

const ManagementBoard = Loadable({
  loader: () => import("./components/ManagementBoard"),
  loading: LazyLoading,
});

export const routes = [
  {
    path: "/management-board",
    exact: true,
    component: ManagementBoard,
  },
];
