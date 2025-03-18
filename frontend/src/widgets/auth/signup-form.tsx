'use client';

import {Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label} from "@/shared/ui-toolkit";
import Link from "next/link";
import {websiteRoutes} from "@/app/routing";
import {useAuthContext} from "@/app/utilities";
import {FormEvent, useEffect} from "react";
import {redirect, useSearchParams} from "next/navigation";

export function SignupForm() {
    const params = useSearchParams();
    const {signup, user} = useAuthContext();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const requestData: SignupRequest = {
            username: data.get('username') as string,
            mail: data.get('email') as string,
            password: data.get('password') as string,
            password_repeat: data.get('password_repeat') as string
        };

        if (await signup(requestData)) redirect(params.get('redirect') || websiteRoutes.home);
    }

    useEffect(() => {
        if (user) {
            redirect(params.get('redirect') || websiteRoutes.home);
        }
    }, [user]);

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Sign up</CardTitle>
                <CardDescription>
                    Provide all the data marked with (*) to create an account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="grid gap-4" onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username *</Label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="johndoe"
                            required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                            id="email"
                            name="email"
                            type="text"
                            placeholder="johndoe@webster.edu"
                            required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password *</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password_repeat">Repeat Password *</Label>
                        <Input
                            id="password_repeat"
                            name="password_repeat"
                            type="password"
                            required/>
                    </div>
                    <Button type="submit" className="w-full">
                        Sign up
                    </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href={websiteRoutes.auth.login + ('?redirect=' + (params.get('redirect') || '/'))} className="underline">
                        Log in
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}