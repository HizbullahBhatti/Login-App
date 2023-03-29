import Password from "./components/Password";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Username from "./components/Username";
import Reset from "./components/Reset";
import Recovery from "./components/Recovery";
import PageNotFound from "./components/PageNotFound";


import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Username/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/password",
    element: <Password/>
  },
  {
    path: "/profile",
    element: <Profile/>
  },
  {
    path: "/reset",
    element: <Reset/>
  },
  {
    path: "/recovery",
    element: <Recovery/>
  },
  {
    path: "/*",
    element: <PageNotFound/>
  },
]);

const App = () => {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
};

export default App;
