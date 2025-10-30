import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./i18n/i18n";
import LanguageProvider from "./features/customer/context/LanguageProvider.tsx";
import { FetchProvider } from "./common/hooks/useFetch.tsx";
import { Toaster } from "sonner";

// import LanguageProvider from "./customer/context/LanguageProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <LanguageProvider>
            <FetchProvider>
                <Toaster
                    toastOptions={
                        {
                            style: {
                                background: 'white'
                            }
                        }
                    }
                />
                <App />
            </FetchProvider>
        </LanguageProvider>
    </BrowserRouter>
);
