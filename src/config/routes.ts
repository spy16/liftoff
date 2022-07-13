import AdminPage from "../pages/AdminPage";
import HomePage from "../pages/HomePage";

type Route = {
  path: string;
  secure: boolean;
  element: () => JSX.Element;
};

export default [
  {
    path: "/",
    secure: false,
    element: HomePage,
  },
  {
    path: "/admin",
    secure: true,
    element: AdminPage,
  },
] as Route[];
