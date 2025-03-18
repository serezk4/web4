import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/shared/ui-toolkit/hover-card";
import {ReactNode} from "react";
import {ScheduleCourse} from "@/entities/schedule";
import {currentLikedCourses} from "@/widgets/schedule/mock";

interface StudentLikedOnHoverProps {
    studentId: string;
    children: ReactNode;
}

export function StudentLikedOnHover({ studentId, children }: StudentLikedOnHoverProps) {
    //TODO: Api request, list of liked courses
    const liked: ScheduleCourse[] = currentLikedCourses.slice(0, 5);

    return (
        <HoverCard>
            <HoverCardTrigger className='underline'>
                {children}
            </HoverCardTrigger>
            <HoverCardContent>
                <span className='font-bold'>Liked Courses</span>
                <div className='text-sm'>
                    {liked.length > 0
                        ? liked.map((course, index) => (
                            <div key={index} className='flex gap-1'>
                                <span>{index + 1}.</span>
                                <span>{course.title}</span>
                            </div>
                        ))
                        : <span>No liked courses</span>
                    }
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}