import IRoute from "../interfaces/IRoute";
import Detail from "../pages/Detail";
import Home from "../pages/Home";

const routes: IRoute[] = [
  {
    path: "/",
    name: "Home Page",
    component: Home,
    exact: true,
  },
  {
    path: "/detail/:orgnum",
    name: "Detail Page",
    component: Detail,
    exact: true,
  },
];

export default routes;
