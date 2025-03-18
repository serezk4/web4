import {BaseHTMLAttributes, ReactNode} from "react";

interface MainGutterProps extends BaseHTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export function MainGutter ({children, className, ...props}: MainGutterProps) {
    return (
        <div className='px-4 md:px-8 lg:px-6 xl:px-[200px] 2xl:px-[236px]'>
            <div className={`${className} w-full max-w-[1400px] mx-auto`} {...props}>
                {children}
            </div>
        </div>
    );
}

export function IgnoreMainGutter ({children, className, ...props}: MainGutterProps) {
    return (
        <div className={`${className} -mx-4 md:-mx-8 lg:-mx-6 xl:-mx-[200px] 2xl:-mx-[236px]`} {...props}>
            {children}
        </div>
    );
}