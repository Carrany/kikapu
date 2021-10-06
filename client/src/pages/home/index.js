import { LazyLoading } from "_components/Loading";
import Loadable from "react-loadable";

const Home = Loadable({
  loader: () => import("./components/Home"),
  loading: LazyLoading,
});

export const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
];
