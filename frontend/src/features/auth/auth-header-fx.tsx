import {ReactNode} from "react";
import {useAuthContext} from "@/app/utilities";
import {Button, Skeleton} from "@/shared/ui-toolkit";
import Link from "next/link";
import {LogInIcon} from "lucide-react";
import { requestGoogleLogin } from "@/app/utilities/providers/auth-provider/api-layer";

interface AuthHeaderFxProps {
    children: ReactNode;
}

export function AuthHeaderFx({ children }: AuthHeaderFxProps) {
    const { initialRender, isAuthenticated } = useAuthContext();

    if (!initialRender) return (
        <div className='flex gap-2 items-center'>
            <Skeleton className='h-8 w-8 rounded-full' />
            <Skeleton className='h-4 w-24' />
        </div>
    );

    if (!isAuthenticated) {
        return (
            <div className='flex items-center space-x-2'>
                <span className='text-sm font-semibold'>Guest</span>
                <Link href={"/auth/login"}>
                    <Button variant='ghost' type='button'>
                        <LogInIcon className='w-4 h-4'></LogInIcon>
                    </Button>
                </Link>
                <button onClick={requestGoogleLogin}>Sign in with Google</button>
            </div>
        )
    }

    return children;
}