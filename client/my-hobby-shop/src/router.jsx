import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./components/homePage/HomePage";
import CatalogPage from './components/catalogPage/CatalogPage'
import CategoryPage from './components/categoryPage/CategoryPage'
import BrandsPage from './components/BrandsPage/BrandsPage'
import LoginPage from "./components/loginPage/LoginPage"
import Registration from "./components/registrationPage/RegistrationPage"
import SelectionMenu from "./components/selectionMenu/SelectionMenu";
import Profile from "./components/profilePage/Profile"
import Cart from "./components/cartPage/CartPage"
import Error from "./components/errorPage/ErrorPage"
import CatalogProductCard from "./components/catalogProductCard/CatalogProductCard";
import MainProductCard from "./components/mainProductCard/MainProductCard";



const router = createBrowserRouter([
    {
        element: <App/>,
        children:[
            {path: "/", element: <HomePage/>},
            {path: "/catalog", element: <CatalogPage/>},
            {path: "/catalog/product/:id", element: <MainProductCard/>},
            {path: "/categories", element: <CategoryPage/>},
            {path: "/brands", element: <BrandsPage/>},
            {path: "/authorization", element: <LoginPage/>},
            {path: "/registration", element: <Registration/>},
            {path: "/menu",
                element: <SelectionMenu/>,
                children:[
                    {path: "profile", element: <Profile/>},
                    {path: "cart", element: <Cart/>},
                ]
            },
            {
                path:"*",
                element: <Error/>
            }
        ]
    }
])
export default router;