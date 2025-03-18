import {FormEvent, useEffect, useState} from "react";
import {CurrentScheduleItem} from "@/entities/schedule/current-schedule-item";
import {Button, Input, ScrollArea, ScrollBar} from "@/shared/ui-toolkit";
import {ScheduleCourse} from "@/entities/schedule/types";
import {coursesMock} from "@/widgets/schedule/mock";
import {Lock, LockOpen} from "lucide-react";

interface ScheduleRecommendationsProps {
    studentId: string;
}

export function ScheduleRecommendations({ studentId }: ScheduleRecommendationsProps) {
    //TODO: set locked courses to current student's schedule courses
    const [lockedCourses, setLockedCourses] = useState<ScheduleCourse[]>([]);
    const [recommendedCourses, setRecommendedCourses] = useState<ScheduleCourse[]>([]);
    const [freeCourses, setFreeCourses] = useState<ScheduleCourse[]>([]);
    const [targetCreditHours, setTargetCreditHours] = useState<number>(15);

    const lockCourse = (course: ScheduleCourse) => {
        setLockedCourses((prev) => [
            ...prev,
            prev.find((item) => item.id == course.id) ?? course
        ]);
        setFreeCourses((prev) => prev.filter((item) => item.id !== course.id));
    }

    const unlockCourse = (course: ScheduleCourse) => {
        setLockedCourses((prev) => prev.filter((item) => item.id !== course.id));
        setFreeCourses((prev) => [
            ...prev,
            prev.find((item) => item.id == course.id) ?? course
        ]);
    }

    const getRecommendations = async () => {
        const currentCreditHours = lockedCourses.reduce((acc, course) => acc + course.creditHours, 0);
        const amountOfCourses = Math.ceil((targetCreditHours - currentCreditHours) / 3);
        //TODO: fetch recommendations from API with amountOfCourses
        const newRecommendedCourses: ScheduleCourse[] = coursesMock.slice(25 + recommendedCourses.length, 25 + recommendedCourses.length + amountOfCourses);
        setRecommendedCourses((prev) => [...prev, ...newRecommendedCourses]);
        setFreeCourses(newRecommendedCourses);
    }

    const saveToCurrent = () => {

    }

    const handleTargetCreditHoursChange = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const targetCreditHours = data.get('targetCreditHours') as string;
        setTargetCreditHours(parseInt(targetCreditHours, 10));
    }

    useEffect(() => {
        const currentCreditHours = lockedCourses.reduce((acc, course) => acc + course.creditHours, 0);
        const potentialCreditHours = currentCreditHours + recommendedCourses.reduce((acc, course) => acc + course.creditHours, 0);
        if (potentialCreditHours < targetCreditHours) {
            getRecommendations();
        }
    }, [lockedCourses, freeCourses, targetCreditHours]);

    return (
        <div className='flex flex-col gap-4'>
            <form className='flex gap-8 items-center pt-8' onSubmit={handleTargetCreditHoursChange}>
                <p className='text-sm break-keep flex-shrink-0'>Target Hours</p>
                <Input type='number' min={13} max={18} defaultValue={targetCreditHours} />
                <Button size='sm' type='submit'>Get Recommendations</Button>
            </form>
            <ScrollArea className='pt-4'>
                <div className="flex space-x-4 pb-4">
                    {lockedCourses.map((course) => (
                        <CurrentScheduleItem
                            key={course.id}
                            className="w-[250px]"
                            course={course}>
                            <div className='flex justify-stretch items-center space-y-2 mb-2 px-4'>
                                <Button variant='secondary' className='w-full' type='button' onClick={() => unlockCourse(course)}>
                                    <Lock/>
                                </Button>
                            </div>
                        </CurrentScheduleItem>
                    ))}
                    {freeCourses.map((course) => (
                        <CurrentScheduleItem
                            key={course.id}
                            className="w-[250px]"
                            course={course}
                        >
                            <div className='flex justify-stretch items-center space-y-2 mb-2 px-4'>
                                <Button variant='outline' className='w-full' type='button' onClick={() => lockCourse(course)}>
                                    <LockOpen />
                                </Button>
                            </div>
                        </CurrentScheduleItem>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <p className='sm'>By clicking button below you will save only locked courses to current schedule</p>
            <div className='flex gap-2'>
                <Button variant='outline' type='button' onClick={getRecommendations}>Rearrange</Button>
                <Button variant='default' type='button' onClick={saveToCurrent}>Save to current</Button>
            </div>
        </div>
    );
}