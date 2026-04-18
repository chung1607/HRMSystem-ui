import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Register from "../pages/auth/RegisterPage/Register";
import LoginPage from "../pages/auth/LoginPage/Login";
import OtpVerification from "../pages/auth/OtpVerificationPage/OtpVerification";
import AdminDashboard from "../pages/admin/AdminDashboard/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers/AdminUsers";
const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "*",
    page: NotFoundPage,
    isShowHeader: false,
  },
  {
    path: "/register",
    page: Register,
    isShowHeader: false,
  },
  {
    path: "/login",
    page: LoginPage,
    isShowHeader: false,
  },
  {
    path: "/verify-otp",
    page: OtpVerification,
    isShowHeader: false,
  },
  {
    path: "/admin/dashboard",
    page: AdminDashboard,
    isShowHeader: false,
  },
  {
    path: "/admin/users",
    page: AdminUsers,
    isShowHeader: false,
  },
];

export default routes;
