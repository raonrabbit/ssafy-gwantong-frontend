import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Login from "./routes/Login";
import Join from "./routes/Join";
import MapPage from "./routes/MapPage";
import MyPage from "./routes/MyPage";
import MapSearchPage from "./routes/MapSearchPage";
import MapResultPage from "./routes/MapResultPage";
import KakaoCallback from "./components/pages/Login/KakaoCallback";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "mypage",
        element: <MyPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/login/oauth2/code/kakao",
        element: <KakaoCallback />,
      },
      {
        path: "join",
        element: <Join />,
      },
      {
        path: "map",
        element: <MapPage />,
        children: [
          {
            path: "search",
            element: <MapSearchPage />,
          },
          {
            path: "apt/:id",
            element: <MapResultPage />,
          },
        ],
      },
    ],
  },
]);
export default router;
