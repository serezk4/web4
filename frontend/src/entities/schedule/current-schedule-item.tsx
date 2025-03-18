import {BaseHTMLAttributes} from "react";
import {Card, CardContent, CardFooter, CardHeader} from "@/shared/ui-toolkit";
import {ScheduleCourse} from "@/entities/schedule/types";

interface CurrentScheduleItemProps extends BaseHTMLAttributes<HTMLDivElement> {
    course: ScheduleCourse;
}

export function CurrentScheduleItem ({ course, className,children, ...props }: CurrentScheduleItemProps) {
    return (
        <Card className={`${className} flex flex-col gap-2`} {...props}>
            <CardHeader>
                <h3 className="font-medium text-lg leading-none">{course.title}</h3>
            </CardHeader>
            <CardContent>
                <p className="text-xs text-muted-foreground">{course.description}</p>
                <p className="text-s pt-2 text-muted-foreground">{course.time}</p>
            </CardContent>
            <CardFooter className='flex justify-between'>
                <p className="text-s text-muted-foreground">{course.weekdays}</p>
                <p className="text-s text-muted-foreground">{course.semester}</p>
            </CardFooter>
            {children}
        </Card>
    )
}