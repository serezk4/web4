import {Button, PageActions} from "@/shared/ui-toolkit";
import Link from "next/link";

export function StudentActions() {
    return (
        <PageActions className='flex justify-center'>
            <Button asChild>
                <Link href='#preferences'>Set the preferences</Link>
            </Button>
            <Button asChild variant="ghost">
                <Link href="#schedule">See schedule</Link>
            </Button>
        </PageActions>
    );
}

export function AdvisorActions() {
    return (
        <PageActions className='flex justify-center'>
            <Button asChild>
                <Link href='#preferences'>Student recommendations</Link>
            </Button>
            <Button asChild variant="ghost">
                <Link href="#schedule">Dataset</Link>
            </Button>
        </PageActions>
    );
}