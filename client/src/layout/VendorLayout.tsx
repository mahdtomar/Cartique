import { Outlet } from "react-router-dom";
import Navbar from "../customer/components/misc/Navbar";

const VendorLayout = () => {
    return (
        <div className=" flex flex-col min-h-screen">
            <Navbar /> {/* change this to the actual VENDOR navbar */}
            <div className="flex-1">
                <Outlet />
            </div>
            {/* footer */}
        </div>
    );
};

export default VendorLayout;
