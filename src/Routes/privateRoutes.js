import ProductAddToCart from "../Components/ProductAddToCart";
import Products from "../Components/Products";
import Profile from "../Pages/Profile";

export const privateRoutes = [

    {
        Name: "Products",
        Path: "/products",
        Component: Products,
    },

    {
        Name: "ProductAddToCart",
        Path: "/product-add-to-cart/:_id",
        Component: ProductAddToCart,
    },
    {
        Name: "Profile",
        Path: "/profile",
        Component: Profile,
    },

]
