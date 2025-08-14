// import userProvider from "@/common/context/userProvider";
import Login from "@/common/Pages/Login";
import Register from "@/common/Pages/Register";
import CustomerRouter from "@/features/customer/CustomerRouter";
import VendorRouter from "@/features/vendor/VendorRouter";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

const MainRouter = () => {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoutes role={'vendor'}></ProtectedRoutes>}>
                <Route path="/vendor/*" element={<VendorRouter />} />

            </Route>
            <Route path="/*" element={<CustomerRouter />} />
        </Routes>
    );
};

export default MainRouter;
