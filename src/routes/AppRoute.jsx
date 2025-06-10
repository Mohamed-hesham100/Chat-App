import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Message from "../components/Message";
import App from "../App";
import Chat from "../components/Chat";
import LogoPage from "../components/LogoPage";
import PrivateRoute from "../components/PrivateRoute";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),

        children: [
          {
            path: "/",
            element: <LogoPage />,
          },
          {
            path: "message",
            element: <Message />,
            children: [
              {
                path: ":userId",
                element: <Chat />,
              },
            ],
          },
        ],
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <h1 className="mt-40 text-center font-bold text-lg">
        404 - Page Not Found
      </h1>
    ),
  },
]);
