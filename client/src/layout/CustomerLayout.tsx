import Navbar from "../customer/components/misc/Navbar";
import { Outlet } from "react-router-dom";

const CustomerLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="content-wrapper flex-1">
                <Outlet />
            </div>
            {/* footer will go here */}
        </div>
    );
};

export default CustomerLayout;
