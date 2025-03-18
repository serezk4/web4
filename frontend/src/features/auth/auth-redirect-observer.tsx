'use client';

import {ReactNode, useEffect} from "react";
import {useAuthContext} from "@/app/utilities";
import {redirect} from "next/navigation";
import {websiteRoutes} from "@/app/routing/websiteRoutes";

interface AuthRedirectObserverProps {
    children: ReactNode;
    destination?: string;
}

export function AuthRedirectObserver ({ destination = websiteRoutes.home }: AuthRedirectObserverProps) {
    const auth = useAuthContext();

    useEffect(() => {
        if (auth.initialRender) {
            redirect(auth.isAuthenticated
                ? destination
                : websiteRoutes.auth.login);
        }
    }, [auth.initialRender, auth.user]);

    return <div>Loading...</div>;
}