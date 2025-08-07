import smartPhones from "./../../assets/images/smartphones-cover-image.png";
import accessories from "./../../assets/images/accessories-cover-image.png";
import electronics from "./../../assets/images/electronics-cover-image.png";
import superMarket from "./../../assets/images/superMarket-cover-image.png";
import { useTranslation } from "react-i18next";
const Categories = () => {
    const { t } = useTranslation();
    return (
        <section className="landing-page-section text-center container">
            <h2 className="text-[35px]">{t("categories.title")}</h2>
            <p className="mt-2 mb-10">{t("categories.description")}</p>
            <div className="grid grid-cols-2 gap-12 capitalize">
                <div className="category-card bg-[#7ACCFF]">
                    <span>{t("categories.smartPhone")}</span>
                    <button className="primary">
                        {t("categories.seeMore")}
                    </button>
                    <img
                        className="category-card-image"
                        src={smartPhones}
                        alt="smart phones category image"
                    />
                </div>
                <div className="category-card bg-[#8ED2DA]">
                    <span>{t("categories.accessories")}</span>
                    <button className="primary">
                        {t("categories.seeMore")}
                    </button>
                    <img
                        className="category-card-image"
                        src={accessories}
                        alt="smart phones category image"
                    />
                </div>
                <div className="category-card bg-[#BDA4E5]">
                    <span>{t("categories.electronics")}</span>
                    <button className="primary">
                        {t("categories.seeMore")}
                    </button>
                    <img
                        className="category-card-image"
                        src={electronics}
                        alt="smart phones category image"
                    />
                </div>
                <div className="category-card bg-[#FC9832]">
                    <span>{t("categories.superMarket")}</span>
                    <button className="primary">
                        {t("categories.seeMore")}
                    </button>
                    <img
                        className="category-card-image"
                        src={superMarket}
                        alt="smart phones category image"
                    />
                </div>
            </div>
        </section>
    );
};

export default Categories;
