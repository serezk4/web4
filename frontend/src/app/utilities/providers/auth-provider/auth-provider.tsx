'use client';

import {createContext, ReactNode} from "react";
import {BasicUser} from "@/entities/auth";
import {useAuth} from "./useAuth";

export interface AuthContextPayload {
    isAuthenticated: boolean;
    initialRender: boolean;
    user: BasicUser | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    signup: (data: SignupRequest) => Promise<boolean>;
    exchangeCode: (code: string) => Promise<LoginResponse | undefined>;
}

export const AuthProviderContext = createContext<AuthContextPayload>({
    isAuthenticated: false,
    initialRender: false,
    user: null,
    login: async () => {
        throw new Error('AuthProvider not implemented');
    },
    logout: async () => {
        throw new Error('AuthProvider not implemented');
    },
    signup: async () => {
        throw new Error('AuthProvider not implemented');
    },
    exchangeCode: async () => {
        throw new Error('AuthProvider not implemented');
    }
});

type AuthProviderProps = {
    children: ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {
    const auth = useAuth();

    return (
        <AuthProviderContext.Provider value={auth}>
            {children}
        </AuthProviderContext.Provider>
    )
}