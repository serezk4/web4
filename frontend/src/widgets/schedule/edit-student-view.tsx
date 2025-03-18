import {Button, Card, CardContent, CardHeader, Input, Separator} from "@/shared/ui-toolkit";
import {useMemo, useState} from "react";
import {SelectStudent} from "@/features/schedule/select-student";
import {StudentUser} from "@/entities/auth";
import {CurrentStudent} from "@/entities/schedule/current-student";
import {ShowStudentCourses} from "@/features/schedule/show-student-courses";
import {ScheduleRecommendations} from "@/entities/schedule/schedule-recommendations";
import {StudentPreferencesOnHover} from "@/features/schedule/student-preferences-on-hover";
import {StudentLikedOnHover} from "@/features/schedule/student-liked-on-hover";

export function EditStudentView() {
    const [selectedStudent, setStudent] = useState<StudentUser | null>(null);

    return (
        <div className='flex flex-col gap-4 max-w-full'>
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                    Student View
                </h2>
                <p className="text-sm text-muted-foreground text-balance">
                    Select a student to view or edit their schedule. <br/> Get recommendations, watch their feedback and adjust the final version of their schedule.
                </p>
            </div>
            <Card>
                <CardHeader>
                    <h3 className="text-xl font-bold tracking-tight pb-4">
                        Current Student
                    </h3>
                    {selectedStudent
                        ? <CurrentStudent
                            reset={() => setStudent(null)}
                            currentStudent={selectedStudent} />
                        : <SelectStudent onConfirm={setStudent}/>}
                </CardHeader>
                <CardContent className='flex flex-col'>
                    {selectedStudent && (
                        <>
                            <h3 className='pt-2 text-xl font-bold pb-4'>Saved Schedule</h3>
                            <ShowStudentCourses studentId={selectedStudent?.id || ''}/>
                            <Separator className='my-4' />
                            <h3 className='pt-2 text-xl font-bold pb-4'>Get Recommendations</h3>
                            <div className='text-balance text-sm'>
                                Get recommendations specifically for this student regarding the courses he can enroll in. <br/> This is based on his
                                {' '}<StudentPreferencesOnHover studentId={selectedStudent?.id || ''}>
                                    preferences
                                </StudentPreferencesOnHover>{' '}
                                and
                                {' '}<StudentLikedOnHover studentId={selectedStudent?.id || ''}>
                                    feedback
                                </StudentLikedOnHover>{' '}
                                from previous courses.
                            </div>
                            <ScheduleRecommendations studentId={selectedStudent?.id || ''} />
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}