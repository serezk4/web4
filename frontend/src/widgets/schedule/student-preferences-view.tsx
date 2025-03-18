import {
    Button,
    Card,
    CardContent,
    CardHeader, Separator,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/shared/ui-toolkit";
import {CoursesList, PassedCourse} from "@/entities/schedule";
import {currentLikedCourses} from "@/widgets/schedule/mock";
import {PaginateCourses} from "@/features/schedule/paginate-courses";
import {useState} from "react";
import {TimeRangeForm} from "@/features/schedule/time-range-form";
import {GeneralPreferencesForm} from "@/features/schedule/general-preferences-form";

interface StudentPreferencesViewProps {
    userId?: string;
}

export const StudentPreferencesView = ({ userId }: StudentPreferencesViewProps) => {
    const [first, setFirst] = useState(0);

    //TODO: replace with API call
    const currentLiked = currentLikedCourses;

    const handlePageChange = (pageNumber: number) => {
        setFirst((pageNumber - 1) * 8);
    }

    return (
        <Tabs className='grid gap-4' defaultValue='feedback'>
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                    Preferences & Feedback
                </h2>
                <p className="text-sm text-muted-foreground text-balance">
                    In this section you can edit your preferences for the upcoming
                    semester and provide feedback on your current courses so that advisors can
                    help you create a schedule that suits your interests and life pace.
                </p>
            </div>
            <Card>
                <CardHeader className='items-start'>
                    <TabsList>
                        <TabsTrigger value='feedback'>Feedback</TabsTrigger>
                        <TabsTrigger value='preferences'>Preferences</TabsTrigger>
                    </TabsList>
                </CardHeader>
                <CardContent>
                    <TabsContent value='feedback' className='flex flex-col gap-2 p-2'>
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Passed Courses
                        </h2>
                        <p className="text-sm text-muted-foreground text-balance">
                            Here you can provide feedback related to the courses you have finished
                            so that future scheduling will be easier for both you and the advisors.
                        </p>
                        <div className='flex flex-col gap-4'>
                            <CoursesList className='pt-2'>
                                {currentLiked.slice(first, first + 8).map((course, key) => (
                                    <PassedCourse course={course} key={key} />
                                ))}
                            </CoursesList>
                            <PaginateCourses
                                pageSize={8}
                                overallSize={currentLiked.length}
                                currentBegin={first}
                                onChange={handlePageChange}/>
                        </div>
                    </TabsContent>
                    <TabsContent value='preferences' className='flex flex-col gap-2 p-2'>
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Future Scheduling Preferences
                        </h2>
                        <p className="text-sm text-muted-foreground text-balance">
                            Set you preferences for the next semester so that advisors can help you.
                            These preferences will be visible to advisors when they are creating your
                            schedule.
                        </p>
                        <Separator />
                        <GeneralPreferencesForm />
                        <Separator className='my-2' />
                        <TimeRangeForm />
                    </TabsContent>
                </CardContent>
            </Card>
        </Tabs>
    )
}