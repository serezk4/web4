'use client';

import {useContext, useEffect} from "react";
import {AuthProviderContext} from "./auth-provider";

export const useAuthContext = () => {
    const authContext = useContext(AuthProviderContext);

    useEffect(() => {
        if (!authContext) {
            throw new Error('useAuthContext must be used within an AuthProvider');
        }
    }, [authContext]);

    return authContext;
}