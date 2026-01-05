import Home from "../components/Home/Home";
import Shop from "../components/Shop/Shop";
import Cart from "../components/Cart/Cart";
import ErrorPage from "../components/ErrorPage/ErrorPage";

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
];

export default routes;
