import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import HomePage from './components/homePage/HomePage'
import LoginPage from './components/loginPage/LoginPage'
import RegistrationPage from './components/registrationPage/RegistrationPage'
import ProfilePage from './components/profilePage/Profile'
import CatalogPage from './components/catalogPage/CatalogPage'
import BrandsPage from './components/BrandsPage/BrandsPage'
import CategoryPage from './components/categoryPage/CategoryPage'
import MainProductCard from './components/mainProductCard/MainProductCard'
import SelectionMenu from './components/selectionMenu/SelectionMenu'
import CartPage from './components/cartPage/CartPage'
import ErrorPage from "./components/errorPage/ErrorPage.jsx";
import CartProductCard from "./components/cartProductCard/CartProductCard.jsx";

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/authorization", element: <LoginPage /> },
            { path: "/registration", element: <RegistrationPage /> },
            { path: "/catalog", element: <CatalogPage /> },
            { path: "/brands", element: <BrandsPage /> },
            { path: "/categories", element: <CategoryPage /> },
            { path: "/catalog/product/:id", element: <MainProductCard /> },
            { path: "/card", element: <CartProductCard/>},
            {
                path: "/menu",
                element: <SelectionMenu/>,
                children:[
                    { path: "profile", element: <ProfilePage/>},
                    { path: "cart", element: <CartPage/>}
                ],
            },
            {
                path: "*",
                element:<ErrorPage/>,
            }
        ]
    }
])
export default router;