import { createBrowserRouter, Navigate } from "react-router-dom";
import Lessons from "./pages/A0";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/lessons" replace />,
  },
  {
    path: "/lessons",
    element: <Lessons />, // simple JSX, no import
  },
]);

export default router;
