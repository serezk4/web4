'use client';

import {MainGutter} from "@/shared/utils/main-gutter";
import {SwitchTheme} from "@/features/general";
import {useAuthContext} from "@/app/utilities";
import {AuthHeaderFx} from "@/features/auth";
import {ExitIcon} from "@radix-ui/react-icons";
import {Button} from "@/shared/ui-toolkit";
import {IdCard, Layers} from "lucide-react";
import Link from "next/link";
import {websiteRoutes} from "@/app/routing";

export function AppHeader() {
    const { user, logout } = useAuthContext();

    return (
        <header className="border-b sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" aria-details='site-header'>
            <MainGutter>
                <div className="container flex h-14 max-w-screen-2xl items-center">
                    <Link href={websiteRoutes.home} className='hover:underline flex gap-2 items-center mr-2'>
                        <Layers className='w-4 h-4' />
                        <span>Web 4 (12370)</span>
                    </Link>
                    <IdCard className='w-4 h-4'></IdCard>
                    <span className='flex gap-2 items-center m-2'>Dorokhin Sergey, 412934</span>
                    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                        <nav className="flex items-center gap-2">
                            <AuthHeaderFx>
                                <div className='flex gap-2'>
                                    <div className='flex items-center space-x-2'>
                                        <span className='text-sm font-semibold'>{user?.preferred_username}</span>
                                    </div>
                                    <Button variant='ghost' type='button' onClick={logout}>
                                        <ExitIcon />
                                    </Button>
                                </div>
                            </AuthHeaderFx>
                            <SwitchTheme />
                        </nav>
                    </div>
                </div>
            </MainGutter>
        </header>
    )
}