import React, { createContext, useEffect, useState } from "react";
import Request from "../api/axios";

type User = { name: string; role: string; id: string };

type ContextType = {
    user: User | undefined;
    isLogged: boolean;
    fetchUser: (force?: boolean) => void;
};

export const UserContext = createContext<ContextType | undefined>(undefined);

const CACHE_DURATION = 5 * 60 * 1000;

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | undefined>(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : undefined;
    });

    const [isLogged, setIsLogged] = useState<boolean>(() => {
        return !!sessionStorage.getItem("user");
    });

    const fetchUser = async (force = false) => {
        const lastFetched = Number(sessionStorage.getItem("userLastFetched") || "0");
        const now = Date.now();

        if (!force && user && now - lastFetched < CACHE_DURATION) {
            return;
        }

        try {
            const res = await Request("/auth/getUser", "GET", true);
            if (res.status === 200) {
                const fetchedUser = res.data.data as User;
                if (fetchedUser.id !== user?.id) {
                    setUser(fetchedUser);
                }
                setIsLogged(true);
                sessionStorage.setItem("user", JSON.stringify(fetchedUser));
                sessionStorage.setItem("userLastFetched", now.toString());
            } else {
                setIsLogged(false);
                setUser(undefined);
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("userLastFetched");
            }
        } catch (error) {
            console.error("Failed to fetch user data", error);
            setIsLogged(false);
            setUser(undefined);
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("userLastFetched");
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, isLogged, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
