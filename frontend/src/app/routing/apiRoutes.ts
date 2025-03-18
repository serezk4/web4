'use client';

export const apiRoutes = {
    auth: {
        fetch: `${process.env.NEXT_PUBLIC_ACCOUNT_BASE_URL}/info/me`,
        security: `${process.env.NEXT_PUBLIC_ACCOUNT_BASE_URL}/info/security`,
        signup: `${process.env.NEXT_PUBLIC_ACCOUNT_BASE_URL}/signup`,
        coordinates_list: `http://localhost:1488/coordinates/manage/list`,
        coordinates_check: `http://localhost:1488/coordinates/manage/check`,
        ...{}
    }
};

export async function loadKeycloakConfig() {
    const keycloakConfigUrl = `${process.env.NEXT_PUBLIC_KC_BASE_URL}/realms/${process.env.NEXT_PUBLIC_KC_REALM}/.well-known/openid-configuration`;

    try {
        const response = await fetch(keycloakConfigUrl);
        const config = await response.json();
        Object.assign(apiRoutes.auth, config);
        console.log(apiRoutes.auth.token_endpoint)
        console.log('Keycloak configuration loaded:', apiRoutes.auth);
    } catch (error) {
        console.error('Failed to load Keycloak configuration:', error);
    }
}

loadKeycloakConfig().then(() => {
    console.log('Keycloak configuration loaded!');
});