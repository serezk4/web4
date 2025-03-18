import {Button, ScrollArea, ScrollBar} from "@/shared/ui-toolkit";
import {currentScheduleMock} from "@/widgets/schedule/mock";
import {CurrentScheduleItem} from "@/entities/schedule";
import {CourseFeedbackHint} from "@/features/schedule";
import {Ratings} from "@/shared/ui-toolkit";
import {toast} from "sonner";

export function CurrentScheduleView() {
    //TODO: replace with API call
    const currentSchedule = currentScheduleMock;

    const handleCourseGradeChange = (grade: number) => {
        toast('Thank you for your feedback!');
    }

    return (
        <div className='grid gap-4'>
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                    Your Schedule
                </h2>
                <p className="text-sm text-muted-foreground">
                    This is your current schedule. It can change over time
                </p>
            </div>
            <ScrollArea>
                <div className="flex space-x-4 pb-4">
                    {currentSchedule.map((course, key) => (
                        <div className='relative' key={key}>
                            <CurrentScheduleItem
                                key={course.id}
                                className="w-[250px]"
                                course={course} />
                            <div className='flex justify-between items-center space-y-2 mt-2 px-4'>
                                <Ratings onChange={handleCourseGradeChange} size={16} defaultValue={0} />
                                <CourseFeedbackHint course={course}>
                                    <Button title='Detailed Feedback' className='mt-2' variant='secondary'>
                                        More
                                    </Button>
                                </CourseFeedbackHint>
                            </div>
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}