import axios from "axios";
import {apiRoutes} from "@/app/routing";

export const fetchUser = async (token?: string): Promise<UserResponse | undefined> => {
    return await axios.get<UserResponse>(apiRoutes.auth.fetch, {
        method: 'GET',
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response?.data)
        .catch(() => undefined);
}

interface Coordinates {
    x: number;
    y: number;
    r: number;
    result?: boolean;
    timestamp?: string;
}

interface CoordinatesResponse {
    list: Coordinates[];
}

export const fetchCoordinates = async (token?: string): Promise<CoordinatesResponse | undefined> => {
    return await axios.get<CoordinatesResponse>(apiRoutes.auth.coordinates_list, {
        method: 'GET',
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response?.data)
        .catch(() => undefined);
}

export const checkCoordinates = async (token?: string, coordinates?: Coordinates): Promise<Coordinates | undefined> => {
    return await axios.post<Coordinates>(apiRoutes.auth.coordinates_check, coordinates, {
        method: 'GET',
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response?.data)
        .catch(() => undefined);
}

export const requestGoogleLogin = () => {
    const clientId = 'spring-app-client';
    const redirectUri = 'http://localhost:3000/auth/callback';
    const realm = 'spring-app-realm';
    const keycloakUrl = `http://localhost:8082/realms/${realm}/protocol/openid-connect/auth`;

    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: 'openid',
        kc_idp_hint: 'google'
    });

    window.location.href = `${keycloakUrl}?${params.toString()}`;
};

export const exchangeCode = async (code: string): Promise<LoginResponse | undefined> => {
    const clientId = 'spring-app-client';
    const clientSecret = 'clientSecret';
    const redirectUri = `${window.location.origin}/auth/callback`;
    const keycloakUrl = 'http://localhost:8082/realms/spring-app-realm/protocol/openid-connect/token';

    const params = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri
    });

    return await axios.post<LoginResponse>(keycloakUrl, params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => response.data)
        .catch(() => undefined);
};

export const requestLogin = async (username: string, password: string): Promise<LoginResponse | undefined> => {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    params.append('client_id', 'spring-app-client');
    params.append('client_secret', 'clientSecret');
    params.append('grant_type', 'password');

    return await axios.post<LoginResponse>(apiRoutes.auth.token_endpoint, params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => response.data)
        .catch(() => undefined);
};

export const requestRefresh = async (refreshToken: string): Promise<RefreshResponse | undefined> => {
    const params = new URLSearchParams();
    params.append('refresh_token', refreshToken);
    params.append('client_id', 'spring-app-client');
    params.append('client_secret', 'clientSecret');
    params.append('grant_type', 'refresh_token');

    return await axios.post<RefreshResponse>(apiRoutes.auth.token_endpoint, params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => response.data)
        .catch(() => undefined);
};

export const requestLogout = async (token: string): Promise<boolean> => {
    return await axios.post<void>(apiRoutes.auth.end_session_endpoint, {
        token
    }).then(() => true)
        .catch(() => false);
}

export const requestSignup = async (data: SignupRequest): Promise<SignupResponse | undefined> => {
    console.log(apiRoutes.auth.signup);
    return await axios.post<SignupResponse>(apiRoutes.auth.signup, data)
        .then((response) => response.data)
        .catch(() => undefined);
}