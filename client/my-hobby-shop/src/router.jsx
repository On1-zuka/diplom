import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./components/homePage/HomePage";
import CatalogPage from './components/catalogPage/CatalogPage'
import CategoryPage from './components/categoryPage/CategoryPage'
import BrandsPage from "./components/BrandsPage/BrandsPage"
import LoginPage from "./components/loginPage/LoginPage"
import Registration from "./components/registrationPage/RegistrationPage"
import SelectionMenu from "./components/selectionMenu/SelectionMenu";
import Profile from "./components/profilePage/Profile"
import Cart from "./components/cartPage/CartPage"
import Error from "./components/errorPage/ErrorPage"
import CatalogProductCard from "./components/catalogProductCard/CatalogProductCard";
import MainProductCard from "./components/mainProductCard/MainProductCard";
import Delivery from "./page/delivery/Delivery";
import Pay from "./page/pay/Pay";
import ProtectedRoute from './protectedRoute'; 
import About from "./page/about/About";
import Contacts from "./page/contacts/Contacts";
import SelectionAdmin from './admin/selectionAdmin/SelectionAdmin'
import EditProducts from "./admin/editProducts/EditProduct";
import EditProductsForm from "./admin/editProductsForm/EditProductsForm";
import AddProductsForm from "./admin/addProductsForm/AddProductsForm";



const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/product/:id", element: <MainProductCard /> },
            { path: "/catalog", element: <CatalogPage /> },
            { path: "/catalog/product/:id", element: <MainProductCard /> },
            { path: "/menu/cart/product/:id", element: <MainProductCard /> },
            { path: "/categories", element: <CategoryPage /> },
            { path: "/categories/catalog/:id", element: <CatalogPage /> },
            { path: "/brands", element: <BrandsPage /> },
            { path: "/brands/catalog/:id", element: <CatalogPage /> },
            { path: "/authorization", element: <LoginPage /> },
            { path: "/registration", element: <Registration /> },
            { path: "/delivery", element: <Delivery /> },
            { path: "/payment", element: <Pay /> },
            { path: "/about", element: <About /> },
            { path: "/contacts", element: <Contacts /> },
            {
                path: "/menu",
                element: <ProtectedRoute element={<SelectionMenu />} />,
                children: [
                    { path: "profile", element: <ProtectedRoute element={<Profile />} /> },
                    { path: "cart", element: <ProtectedRoute element={<Cart />} /> },
                ]
            },
            {
                path: "/admin",
                element: <SelectionAdmin />,  
                children:[
                    { path: "editProducts", element: <EditProducts/>},
                    { path: "editProducts/product/:id", element: <EditProductsForm/>},
                    { path: "addProducts", element: <AddProductsForm/> },
                ]
            },
            {
                path: "*",
                element: <Error />
            }
        ]
    }
]);
export default router;
