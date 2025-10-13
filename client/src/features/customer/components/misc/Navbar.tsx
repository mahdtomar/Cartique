import Logo from "./Logo";
import searchIcon from "./../../assets/icons/MagnifyingGlass.svg";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

import cartIcon from "./../../assets/icons/ShoppingCartSimple.svg";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { languageContext } from "../../context/LanguageProvider";
import GlobalProductSearch from "@/common/components/navbar/GlobalProductSearch";
const Navbar = () => {
    type NavLink = {
        url: string;
        title: string;
    };
    const { t, i18n } = useTranslation();
    const links: NavLink[] = [
        { url: "/", title: t("navigation.home") },
        { url: "/store", title: t("navigation.store") },
        { url: "/contact-us", title: t("navigation.contact") },
    ];
    const { toggleLang } = useContext(languageContext);
    // const toggleLang = () => {
    //     if (i18n.language === "ar") {
    //         i18n.changeLanguage("en");
    //     } else {
    //         i18n.changeLanguage("ar");
    //     }
    // };

    // const [searchParams, setSearchParams] = useSearchParams();
    // const search = searchParams.get("search") || "";

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchParams((prev) => {
    //         prev.set("search", e.target.value);
    //         prev.set("page", "1"); // reset to first page when searching
    //         return prev;
    //     });
    // };
    return (
        <nav className="mx-0 sticky top-0 left-0 bg-white py-3 shadow">
            <div className="flex justify-between py-2 container capitalize">
                <Logo />
                <label
                    className="search border-1 shadow-md flex p-2 gap-2 justify-start rounded-sm overflow-hidden w-[444px]"
                    htmlFor="navbar-search"
                >
                    <img
                        src={searchIcon}
                        alt="Magnifying Glass icon"
                        className="w-6 self-start"
                    />
                    <GlobalProductSearch />
                </label>
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
                            <button className="primary">
                                {t("navigation.login")}
                            </button>
                        </Link>
                    </li>
                    <button onClick={toggleLang}>
                        {i18n.language === "ar" ? "EN" : "AR"}
                    </button>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
