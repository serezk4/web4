import {MainGutter} from "@/shared/utils";

export function AppFooter() {
    return (
        <footer className="flex border-t z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 min-h-[60px]" aria-details='site-footer'>
            <MainGutter className='flex h-full items-center'>
                <p>&copy; О великий Spring!</p>
            </MainGutter>
        </footer>
    )
}