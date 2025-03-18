import {RatedCourse} from "@/entities/schedule/types";
import {ThumbsDown, ThumbsUp} from "lucide-react";
import {Button, Card, CardContent, CardHeader} from "@/shared/ui-toolkit";
import {toast} from "sonner";
import {useMemo} from "react";
import {cn} from "@/shared/lib/utils";

interface PassedCourseProps {
    course: RatedCourse;
}

export function PassedCourse({ course }: PassedCourseProps) {
    const variant = useMemo(() => course.liked
        ? 'positive'
        : course.liked === false
            ? 'negative'
            : 'neutral', [course.liked]);

    const handleLikeCourse = () => {
        toast('Thank you for your feedback!');
    }

    const handleDislikeCourse = () => {
        toast('Thank you for your feedback!');
    }

    return (
        <Card className={cn(`flex flex-col justify-between h-full shadow-sm`,
            variant === 'positive' && 'shadow-[rgba(0,255,0,0.15)]',
            variant === 'negative' && 'shadow-[rgba(255,0,0,0.15)]',
            variant === 'neutral' && 'shadow-none')}>
            <CardHeader>
                <div>{course.title}</div>
            </CardHeader>
            <CardContent className={`flex flex-col justify-between gap-2`}>
                <div>{course.semester}</div>
                <div className='flex gap-2 flex-shrink-0'>
                    <Button
                        onClick={handleLikeCourse}
                        className='px-1'
                        disabled={course.liked}
                        variant='ghost'
                        type='button'
                        title='like course'>
                        <ThumbsUp size={20} className={cn(course.liked && 'text-green-200 fill-green-200')} />
                    </Button>
                    <Button
                        onClick={handleDislikeCourse}
                        className='px-1'
                        disabled={course.liked === false}
                        variant='ghost'
                        type='button'
                        title='dislike course'>
                        <ThumbsDown size={20} className={cn(course.liked === false && 'text-red-200 fill-red-200')} />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}