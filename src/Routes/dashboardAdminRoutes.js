import AddNewProduct from "../Components/AddNewProduct";
import AllOrders from "../Components/AllOrders";
import AllUsers from "../Components/AllUsers";
import DashboardFrontPage from "../Components/DashboardFrontPage";
import MyOrders from "../Components/MyOrders";
import UpdateProduct from "../Components/UpdateProduct";


export const dashboardAdminRoutes = [

   
    {
        Name: "ManageAllOrders",
        Path: "/dashboard/all-orders",
        // Path: "/dashboard",
        Component: AllOrders,
    },

    {
        Name: "AddNewProduct",
        Path: "/dashboard/add-new-product",
        Component: AddNewProduct,
    },

    {
        Name: "UpdateProduct",
        Path: "/dashboard/update-product",
        Component: UpdateProduct,
    },
    {
        Name: "AllUsers",
        Path: "/dashboard/all-users",
        Component: AllUsers,
    },






]