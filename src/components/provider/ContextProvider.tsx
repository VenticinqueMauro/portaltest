'use client';

import { handleDecodeAdminUserToken } from "@/actions/adminUsers/adminUserToken";
import { handleDecodeUserToken } from "@/actions/auth-users-page/userToken";
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

export interface UserContextType {
    user: any;
    adminUser: any;
    refresh: boolean;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    handleRefresh: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(null);
    const [adminUser, setAdminUser] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        async function getUser() {
            const response = await handleDecodeUserToken();
            setUser(response);
        }

        async function getAdminUser() {
            const response = await handleDecodeAdminUserToken();
            setAdminUser(response);
        }

        getUser();
        getAdminUser();
    }, [refresh]);

    const handleRefresh = () => setRefresh(prev => !prev);

    return (
        <UserContext.Provider value={{ user, adminUser, refresh, setUser, handleRefresh }}>
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
