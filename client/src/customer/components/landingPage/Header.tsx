import tabletImage from "./../../assets/images/ipad.png";
import earphonesImage from "./../../assets/images/earphones.png";
import watchImage from "./../../assets/images/watch.png";
import knifeImage from "./../../assets/images/ketchin-knife.png";
import rightArrow from "./../../assets/icons/ArrowRight.svg";
import { useTranslation } from "react-i18next";

const Header = () => {
    const { t } = useTranslation();
    return (
        <header className="landing-page-section">
            <div className="container flex">
                <div className="text-start w-full">
                    <h1 className="capitalize heading-1">
                        {t("hero.title")}
                    </h1>
                    <h1 className="capitalize heading-1">
                        test
                    </h1>
                    <p className="mt-4 mb-10">
                        {t("hero.description")}
                    </p>
                    <div className="flex gap-5">
                        <button className="primary">{t("hero.shopNow")}</button>
                        <button className="secondary">
                            <span>{t("hero.exploreDeals")}</span>
                            <img src={rightArrow} alt="right arrow" />
                        </button>
                    </div>
                </div>
                <div className="bg-[#F5F5F5] flex w-full gap-5 p-5 rounded-md">
                    <div className="flex flex-col gap-5">
                        <img
                            className="rounded-md"
                            src={tabletImage}
                            alt="ipad image"
                        />
                        <img
                            className="rounded-md"
                            src={earphonesImage}
                            alt="earphones image"
                        />
                    </div>
                    <div className="flex flex-col gap-5">
                        <img
                            className="rounded-md"
                            src={watchImage}
                            alt="watch image"
                        />
                        <img
                            className="rounded-md"
                            src={knifeImage}
                            alt="kitchen knife image"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
