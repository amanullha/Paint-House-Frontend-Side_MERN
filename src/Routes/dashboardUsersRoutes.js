
import DashboardFrontPage from "../Components/DashboardFrontPage";
import MyOrders from "../Components/MyOrders";


export const dashboardUsersRoutes = [
    {
        Name: "MyOrders",
        Path: "/dashboard/my-orders",
        // Path: "/dashboard",
        Component: MyOrders,
    },
    {
        Name: "Dashboard",
        Path: "/dashboard",
        // Path: "/dashboard",
        Component: DashboardFrontPage,
    },

]