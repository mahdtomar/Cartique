import { Route, Routes } from "react-router-dom";
import CustomerRouter from "../customer/CustomerRouter";

const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<CustomerRouter />} />
        </Routes>
    );
};

export default MainRouter;
