import Register from "@/common/Pages/Register";
import CustomerRouter from "@/features/customer/CustomerRouter";
import VendorRouter from "@/features/vendor/VendorRouter";
import { Route, Routes } from "react-router-dom";

const MainRouter = () => {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/vendor/*" element={<VendorRouter />} />
            <Route path="/*" element={<CustomerRouter />} />
        </Routes>
    );
};

export default MainRouter;
