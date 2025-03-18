'use client';

import {useEffect} from "react";
import {useSearchParams} from 'next/navigation';
import {exchangeCode} from "@/app/utilities/providers/auth-provider/api-layer";
import {useRouter} from 'next/navigation';
import {useTokenRotation} from "@/app/utilities/providers/auth-provider/useTokenRotation";

const AuthCallback = () => {

    const searchParams = useSearchParams();
    const router = useRouter();

    const { setTokenState } = useTokenRotation();

    useEffect(() => {
        const handleAuth = async () => {
            const code = searchParams.get('code');
            if (code) {
                const tokenResponse = await exchangeCode(code);
                if (tokenResponse) {
                    setTokenState({
                        access_token: tokenResponse.access_token,
                        refresh_token: tokenResponse.refresh_token,
                    });

                    router.push('/main');
                } else {
                    console.error("Failed to exchange code for token.");
                }
            }
        };
        handleAuth();
    }, [searchParams, router, setTokenState]);

    return <div>Processing login...</div>;
};

export default AuthCallback;