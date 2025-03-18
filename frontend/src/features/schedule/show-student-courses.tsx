import {studentTimetablesMock} from "@/widgets/schedule/mock";
import {CurrentScheduleItem, ScheduleCourse} from "@/entities/schedule";
import {Button, ScrollArea, ScrollBar} from "@/shared/ui-toolkit";
import {useMemo, useState} from "react";

interface ShowStudentCoursesProps {
    studentId: string;
}

export function ShowStudentCourses({ studentId }: ShowStudentCoursesProps) {
    // TODO: replace with API Call
    const [excludedCourses, setExcludedCourses] = useState<ScheduleCourse[]>([]);
    const selectedCourses = useMemo<ScheduleCourse[]>(
        () => studentTimetablesMock.get(studentId) || []
    , [studentId]);

    const currentDisplay = useMemo(() => {
        return selectedCourses.filter((course) => !excludedCourses.find((item) => course.id == item.id))
    }, [selectedCourses, excludedCourses]);

    const excludeCourse = (course: ScheduleCourse) => {
        setExcludedCourses((prev) => [
            ...prev,
            prev.find((item) => item.id == course.id) ?? course
        ]);
    };

    return (
        <ScrollArea>
            <div className="flex space-x-4 pb-4">
                {selectedCourses.length > 0 && currentDisplay.map((course, key) => (
                    <div className='relative' key={key}>
                        <CurrentScheduleItem
                            key={course.id}
                            className="w-[250px]"
                            course={course} />
                        <div className='flex justify-end items-center space-y-2 mt-2 px-4'>
                            <Button type='button' variant='secondary' size='sm' onClick={() => excludeCourse(course)}>Exclude</Button>
                        </div>
                    </div>
                ))}
                {currentDisplay.length === 0 && (
                    <div className='flex flex-col items-center justify-center w-full h-full'>
                        <h3 className='text-lg text-muted-foreground'>No courses found</h3>
                    </div>
                )}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}