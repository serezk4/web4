'use client';

import Link from "next/link"

import { Button } from "@/shared/ui-toolkit/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui-toolkit/card"
import { Input } from "@/shared/ui-toolkit/input"
import { Label } from "@/shared/ui-toolkit/label"
import {websiteRoutes} from "@/app/routing";
import {FormEvent, useEffect} from "react";
import {useAuthContext} from "@/app/utilities";
import {redirect, useSearchParams} from "next/navigation";

export function LoginForm() {
  const {login, user} = useAuthContext();
  const params = useSearchParams();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    if (await login(
        data.get('username') as string,
        data.get('password') as string
    )) redirect(params.get('redirect') || websiteRoutes.home);
  };

  useEffect(() => {
    if (user) {
      redirect(params.get('redirect') || websiteRoutes.home);
    }
  }, [user]);

  return (
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="testuser"
                  required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                  name="password"
                  id="password"
                  type="password"
                  required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href={websiteRoutes.auth.signup+'?redirect='+(params.get('redirect') || '/')} className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
  )
};
