import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/shared/ui-toolkit/hover-card";
import {ReactNode} from "react";

interface StudentPreferencesOnHoverProps {
    studentId: string;
    children: ReactNode;
}

export function StudentPreferencesOnHover({ studentId, children }: StudentPreferencesOnHoverProps) {
    const preferences = [];

    return (
        <HoverCard>
            <HoverCardTrigger className='underline'>
                {children}
            </HoverCardTrigger>
            <HoverCardContent>
                <span>Filters such as study time and study format</span>
            </HoverCardContent>
        </HoverCard>
    );
}