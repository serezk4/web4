'use client';

import {Button, PageHeader, PageHeaderDescription, PageHeaderHeading} from "@/shared/ui-toolkit";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col py-10 gap-20">
            <PageHeader className='text-center items-center'>
                <PageHeaderHeading className="hidden md:block">
                    New era of coordinates checker here
                </PageHeaderHeading>
                <PageHeaderHeading className="md:hidden">Examples</PageHeaderHeading>
                <PageHeaderDescription>
                    You can... check coordinates! and... view results! and... check again!<br/>
                    That is the power of coordinates checker!
                </PageHeaderDescription>
                <Link href={'/main'}>
                    <Button variant='default' className={'scale-125 mt-5'} type='button'>
                        Go to the future 🚀
                    </Button>
                </Link>
            </PageHeader>

            <Image
                src="/ad.png"
                alt="Default our app user"
                width={10000}
                height={1000}
            />
        </div>
    );
}
