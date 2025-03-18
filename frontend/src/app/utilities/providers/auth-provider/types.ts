interface UserResponse {
    sub: string;
    email_verified: boolean;
    allowed_origins: string[];
    roles: string[];
    issuer: string;
    preferred_username: string;
    given_name: string | null;
    family_name: string | null;
    sid: string;
    acr: string;
    azp: string;
    scope: string;
    name: string | null;
    email: string;
    exp: number;
    iat: number;
    jti: string;
}

interface AuthResponse {
    access_token: string;
    refresh_token: string;
    user: UserResponse;
}


interface SignupRequest {
    username: string;
    password: string;
    password_repeat: string;
    mail: string;
}

interface SignupResponse extends AuthResponse {
}

interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse extends AuthResponse {
}

interface RefreshRequest {
    refresh_token: string;
}

interface RefreshResponse {
    access_token: string;
    access_expiration: string;
}

interface TokenResponse {
    access_token: string;
    refresh_token: string;
}