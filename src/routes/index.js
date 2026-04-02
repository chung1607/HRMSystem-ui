import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Test from "../TestConnect";
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
        path: "/test",
        page: Test,
        isShowHeader: false
    }
]

export default routes;
