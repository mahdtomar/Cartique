import { createContext, useEffect, type Context } from "react";
import { useTranslation } from "react-i18next";

export const TranslationContext: Context<contextType> = createContext({
    toggleLang: () => { },
});
type contextType = {
    toggleLang: () => void;
};
const TranslationProvider = ({ children }: { children: React.ReactNode }) => {
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
        <TranslationContext.Provider value={{ toggleLang }}>
            {children}
        </TranslationContext.Provider>
    );
};

export default TranslationProvider;
