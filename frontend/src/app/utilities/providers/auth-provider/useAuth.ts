import {useCallback, useEffect, useMemo, useState} from "react";
import {BasicUser} from "@/entities/auth";
import {fetchUser, requestLogout} from "./api-layer";
import {useTokenRotation} from "@/app/utilities/providers/auth-provider/useTokenRotation";

export const useAuth = () => {
    const { accessToken, logout: tokenLogout, login: tokenLogin, signup: tokenSignup } = useTokenRotation();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [data, setData] = useState<BasicUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetch = async () => {
        const user = await fetchUser(accessToken);

        if (user) {
            const basicUser: BasicUser = {
                ...user
            };
            console.log(basicUser)
            setData(basicUser || null);
        } else {
            setData(null);
        }

        setIsAuthenticated(!!user);
    }

    const login = useCallback(async (username: string, password: string): Promise<boolean> => {
        const response = await tokenLogin({ username, password });
        const fetchResult = fetch();

        return !!response && !!fetchResult;
    }, [tokenLogin]);

    const logout = useCallback(async (): Promise<void> => {
        await requestLogout(accessToken || '');
        await tokenLogout();
        setData(null);
        setIsAuthenticated(false);
    }, [accessToken]);

    const signup = useCallback(async (data: SignupRequest): Promise<boolean> => {
        const response = await tokenSignup(data);

        if (response) {
            const basicUser: BasicUser = {
                ...response
            };
            console.log(basicUser)
            setData(basicUser);
        }

        setIsAuthenticated(!!response);
        return !!response;
    }, []);

    useEffect(() => {
        if (accessToken) {
            fetch().then(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [accessToken]);

    return useMemo(() => ({
        isAuthenticated,
        user: data,
        login,
        logout,
        signup,
        accessToken,
        initialRender: !isLoading
    }), [isAuthenticated, login, logout, signup, data, isLoading, accessToken]);
}