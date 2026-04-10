import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Register from "../pages/auth/RegisterPage/Register";
import LoginPage from "../pages/auth/LoginPage/Login";
const routes = [
    {
        path: "/",
        page: HomePage,
        isShowHeader: true
    },
    {
        path: "*",
        page: NotFoundPage,
        isShowHeader: false
    },
    {
        path: "/register",
        page: Register,
        isShowHeader: false
    },
    {
        path: "/login",
        page: LoginPage,
        isShowHeader: false
    }
]

export default routes;
