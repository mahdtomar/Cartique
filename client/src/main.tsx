import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./i18n/i18n";
import TranslationProvider from "./features/customer/context/TranslationContext.tsx";
// import { FetchProvider } from "./common/hooks/useFetch.tsx";
import { Toaster } from "sonner";
import { LanguagesProvider } from "./common/context/LanguagesContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import TranslationProvider from "./customer/context/TranslationContext.tsx";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <LanguagesProvider>
                <TranslationProvider>

                    {/* <FetchProvider> */}
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
                    {/* </FetchProvider> */}
                </TranslationProvider>
            </LanguagesProvider>
        </QueryClientProvider>
    </BrowserRouter>
);
