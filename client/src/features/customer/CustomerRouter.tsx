import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CustomerLayout from "@/layout/CustomerLayout";
import Store from "./pages/Store";
import StoreProvider from "./context/StoreProvider";
import ProductPage from "./pages/ProductPage";
import CartProvider from "./context/CartProvider";
// import CustomerLayout from "../layout/CustomerLayout";

const CustomerRouter = () => {
    return (
        <Routes>
            <Route element={<CustomerLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="store" element={<StoreProvider><Store /></StoreProvider>} />
                <Route element={<CartProvider></CartProvider>}>
                    <Route path="product/:proudctId" element={<ProductPage />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default CustomerRouter;
