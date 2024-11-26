import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Login from "./routes/Login";
import MapPage from "./routes/MapPage";
import MyPage from "./routes/MyPage";
import MapSearchPage from "./routes/MapSearchPage";
import MapResultPage from "./routes/MapResultPage";
import KakaoCallback from "./components/pages/Login/KakaoCallback";
import NoticesPage from "./routes/NoticesPage";
import BookmarkPage from "./routes/BookmarkPage";
import ProtectedRoute from "./components/pages/commons/ProtectedRoute";
import NoticeRegister from "./routes/NoticeRegisterPage";
import NoticeDetail from "./routes/NoticeDetailsPage";
import ProtectedAuthorRoute from "./components/pages/commons/ProtectedAuthorRoute";
import NoticeUpdate from "./routes/NoticeUpdatePage";

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
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "bookmark",
        element: (
          <ProtectedRoute>
            <BookmarkPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/auth/redirect",
        element: <KakaoCallback />,
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
      {
        path: "notices",
        element: <NoticesPage />,
      },
      {
        path: "notices/register",
        element: (
          <ProtectedRoute>
            <NoticeRegister />
          </ProtectedRoute>
        ),
      },
      {
        path: "notices/:id",
        element: <NoticeDetail />,
      },
      {
        path: "notices/:id/edit",
        element: (
          <ProtectedRoute>
            <ProtectedAuthorRoute>
              <NoticeUpdate />
            </ProtectedAuthorRoute>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
export default router;
