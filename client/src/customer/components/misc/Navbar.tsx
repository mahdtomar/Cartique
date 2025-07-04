import Logo from "./Logo";
import searchIcon from "./../../assets/icons/MagnifyingGlass.svg";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

import cartIcon from "./../../assets/icons/ShoppingCartSimple.svg";
const Navbar = () => {
    type NavLink = {
        url: string;
        title: string;
    };

    const links: NavLink[] = [
        { url: "/", title: "home" },
        { url: "/store", title: "store" },
        { url: "/contact-us", title: "contact us" },
    ];
    return (
        <nav className="mt-6 mx-0">
            <div className="flex justify-between py-2 container">
                <Logo />
                <div className="search border-1 shadow-md flex p-2 gap-2 justify-start rounded-sm overflow-hidden w-[444px]">
                    <img
                        src={searchIcon}
                        alt="Magnifying Glass icon"
                        className="w-6"
                    />
                    <input
                        type="text"
                        placeholder="Search"
                        className="block w-full focus:outline-0"
                    />
                </div>
                <ul className="flex gap-7 items-center justify-between">
                    {links.map((link) => (
                        <li key={link.url}>
                            <NavLink
                                to={link.url}
                                className={({ isActive }) =>
                                    `navlink ${isActive ? "active" : ""}`
                                }
                            >
                                {link.title}
                            </NavLink>
                        </li>
                    ))}
                    <li>
                        <Link to={"/check-out"}>
                            <img src={cartIcon} alt="shopping cart" />
                        </Link>
                    </li>
                    <li>
                        <Link to={"/login"}>
                            <button className="primary">Login</button>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
