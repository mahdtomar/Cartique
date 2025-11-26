import "./App.css";
import "./tailwind.css";
import MainRouter from "./router/MainRouter";
import i18n from "./i18n/i18n";
import UserProvider from "./common/context/UserProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// import i18n from '';


function App() {
    console.log("Detected language:", i18n.language);
    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
    return (
        <>
            <UserProvider>
                    <MainRouter />
            </UserProvider>
        </>
    );
}

export default App;
