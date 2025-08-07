import { createContext, useEffect, type Context } from "react";
import { useTranslation } from "react-i18next";

export const languageContext: Context<contextType> = createContext({
    toggleLang: () => {},
});
type contextType = {
    toggleLang: () => void;
};
const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const { i18n } = useTranslation();
    const toggleLang = () => {
        if (i18n.language === "ar") {
            i18n.changeLanguage("en");
        } else {
            i18n.changeLanguage("ar");
        }
    };
    useEffect(() => {
        document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
    }, [i18n.language]);
    return (
        <languageContext.Provider value={{ toggleLang }}>
            {children}
        </languageContext.Provider>
    );
};

export default LanguageProvider;
