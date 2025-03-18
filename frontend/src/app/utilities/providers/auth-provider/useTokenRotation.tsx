import {useCallback, useEffect, useRef, useState} from "react";
import {requestLogin, requestRefresh, requestSignup} from "@/app/utilities/providers/auth-provider/api-layer";

const STORAGE_AUTH_KEY = "refreshToken";
const SESSION_ACCESS_KEY = "accessToken";
const MAX_LIFETIME_REFRESH = 0.9;

export const useTokenRotation = () => {
    const [tokenState, setTokenState] = useState<TokenResponse>();
    const timeout = useRef<NodeJS.Timeout>();

    const updateAccessToken = async (refreshToken = tokenState?.refresh_token) => {
        const access = await requestRefresh(refreshToken || '');
        if (access) {
            clearTimeout(timeout.current);
            const distance = new Date(access.access_expiration).getTime() - new Date().getTime();
            sessionStorage.setItem(SESSION_ACCESS_KEY, access.access_token);
            timeout.current = setTimeout(() => updateAccessToken(), distance * MAX_LIFETIME_REFRESH);
        }
    };

    const login = useCallback(async (data: LoginRequest): Promise<LoginResponse | undefined> => {
        const response = await requestLogin(data.username, data.password);

        if (response) {
            setTokenState({access_token: response.access_token, refresh_token: response.refresh_token});
            sessionStorage.setItem(STORAGE_AUTH_KEY, response.refresh_token);
            updateAccessToken(response.refresh_token);
        } else {
            setTokenState(undefined);
            clearTimeout(timeout.current);
        }

        return response;
    }, [timeout.current]);

    const logout = useCallback(async () => {
        clearTimeout(timeout.current);
        sessionStorage.removeItem(SESSION_ACCESS_KEY);
        setTokenState(undefined);
    }, [timeout.current]);

    const signup = useCallback(async (data: SignupRequest): Promise<UserResponse | undefined> => {
        const response = await requestSignup(data);

        if (response) {
            setTokenState({
                access_token: response.access_token,
                refresh_token: response.refresh_token
            });
        }

        return response ? response.user : undefined;
    }, []);

    useEffect(() => {
        if (tokenState?.access_token)
            sessionStorage.setItem(SESSION_ACCESS_KEY, tokenState?.access_token || '');
        if (tokenState?.refresh_token)
            sessionStorage.setItem(STORAGE_AUTH_KEY, tokenState?.refresh_token || '');
    }, [tokenState]);

    useEffect(() => {
        const token = sessionStorage.getItem(SESSION_ACCESS_KEY);
        const refresh = sessionStorage.getItem(STORAGE_AUTH_KEY);

        if (token || refresh) {
            setTokenState({access_token: token || '', refresh_token: refresh || ''});
        }

        refresh && updateAccessToken(refresh);
    }, []);

    return {login, logout, signup, accessToken: tokenState?.access_token, setTokenState};
};