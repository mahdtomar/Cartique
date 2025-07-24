import { Route, Routes } from "react-router-dom";
import CustomerRouter from "../customer/CustomerRouter";
import Register from "../Pages/Register";
import VendorRouter from "../vendor/VendorRouter";

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
