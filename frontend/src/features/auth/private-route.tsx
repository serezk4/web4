'use client';

import {useAuthContext} from "@/app/utilities";
import {ReactNode} from "react";
import {redirect, usePathname} from "next/navigation";
import {AuthRedirectObserver} from "@/features/auth/auth-redirect-observer";
import {websiteRoutes} from "@/app/routing";

interface PrivateRouteProps {
    children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
    const location = usePathname();
    const {initialRender, isAuthenticated, user} = useAuthContext();

    if (!initialRender) {
        return (
            <AuthRedirectObserver destination={location}>
                <div>Loading...</div>
            </AuthRedirectObserver>
        );
    }

    if (isAuthenticated && user) return children;

    const url = new URLSearchParams({redirect: location}).toString();
    redirect(websiteRoutes.auth.login + '?' + url);
}