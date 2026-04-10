import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Register from "../pages/auth/RegisterPage/Register";
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
    }
]

export default routes;
