'use client';

import {BaseHTMLAttributes, ReactNode, useLayoutEffect, useState} from "react";

interface ExcludeLayoutProps extends BaseHTMLAttributes<HTMLDivElement>{
    children: ReactNode;
}

export function ExcludeHeader({children, style, ...props}: ExcludeLayoutProps) {
    const [top, setTop] = useState<number>();

    useLayoutEffect(() => {
        const headerElement = document.querySelector('header[aria-details="site-header"]');
        setTop(headerElement?.scrollHeight || 0);
    }, []);

    return (
        <div style={{ minHeight: `calc(100dvh - ${top}px)`, ...style }} {...props}>
            {children}
        </div>
    )
}

export function ExcludeFooter({children, style, ...props}: ExcludeLayoutProps) {
    const [bottom, setBottom] = useState<number>();

    useLayoutEffect(() => {
        const footerElement = document.querySelector('footer[aria-details="site-footer"]');
        setBottom(footerElement?.scrollHeight || 0);
    }, []);

    return (
        <div style={{ minHeight: `calc(100dvh - ${bottom}px)`, ...style }} {...props}>
            {children}
        </div>
    )
}

export function ExcludeLayout({children, style, ...props}: ExcludeLayoutProps) {
    const [offset, setOffset] = useState<number>();

    useLayoutEffect(() => {
        const footerElement = document.querySelector('footer[aria-details="site-footer"]');
        const headerElement = document.querySelector('header[aria-details="site-header"]');
        setOffset((footerElement?.scrollHeight || 0) + (headerElement?.scrollHeight || 0));
    }, []);

    return (
        <div style={{ minHeight: `calc(100dvh - ${offset}px)`, ...style }} {...props}>
            {children}
        </div>
    )
}
