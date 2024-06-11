'use client';

import { handleDecodeUserToken } from "@/actions/auth-users-page/userToken";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface UserContextType {
    user: any;
    refresh: boolean;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    handleRefresh: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        async function getUser() {
            const response = await handleDecodeUserToken();
            console.log(response)
            setUser(response);
        }

        getUser();
    }, [refresh]);

    const handleRefresh = () => setRefresh(prev => !prev);

    return (
        <UserContext.Provider value={{ user, refresh, setUser, handleRefresh }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a ContextProvider");
    }
    return context;
};
