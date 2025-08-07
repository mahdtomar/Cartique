import { Route, Routes } from "react-router-dom";
import ProductForm from "./pages/ProductForm";
import VendorLayout from "@/layout/VendorLayout";
// import VendorLayout from "../layout/VendorLayout";

const VendorRouter = () => {
    return (
        <Routes>
            <Route element={<VendorLayout />}>
                <Route path="add-product" element={<ProductForm />} />
            </Route>
        </Routes>
    );
};

export default VendorRouter;
