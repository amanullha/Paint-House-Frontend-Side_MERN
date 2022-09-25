import React from 'react';
import Login from '../Authentication/Login';
import SignUp from '../Authentication/SignUp';
import ProductAddToCart from '../Components/ProductAddToCart';
import ProductDetails from '../Components/ProductDetails';
import Products from '../Components/Products';
import About from '../Pages/About';
import Contact from '../Pages/Contact';
import Home from '../Pages/Home';

export const publicRoutes = [
    {
        Name: "Home",
        Path: "/",
        Component: Home,
    },
    {
        Name: "Home",
        Path: "/home",
        Component: Home,
    },
    // {
    //     Name: "Products",
    //     Path: "/products",
    //     Component: Products,
    // },
    {
        Name: "About",
        Path: "/about",
        Component: About,
    },
    {
        Name: "Contact",
        Path: "/contact",
        Component: Contact,
    },
    {
        Name: "Login",
        Path: "/login",
        Component: Login,
    },
    {
        Name: "SingUp",
        Path: "/sign-up",
        Component: SignUp,
    },
    {
        Name: "ProductDetails",
        Path: "/product-details/:_id",
        Component: ProductDetails,
    },
    // {
    //     Name: "ProductDetails",
    //     Path: "/product-add-to-cart/:_id",
    //     Component: ProductAddToCart,
    // },
]

