import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CustomerLayout from "@/layout/CustomerLayout";
// import CustomerLayout from "../layout/CustomerLayout";

const CustomerRouter = () => {
    return (
        <Routes>
            <Route element={<CustomerLayout />}>
                <Route path="/" element={<LandingPage />} />
            </Route>
        </Routes>
    );
};

export default CustomerRouter;
