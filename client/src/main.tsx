import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./i18n/i18n";
import LanguageProvider from "./features/customer/context/LanguageProvider.tsx";
import { FetchProvider } from "./common/hooks/useFetch.tsx";
// import LanguageProvider from "./customer/context/LanguageProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <LanguageProvider>
                <FetchProvider>
                <App />
                </FetchProvider>
            </LanguageProvider>
        </BrowserRouter>
    </StrictMode>
);
