import {
    Button,
    Dialog,
    DialogContent, DialogFooter,
    DialogTitle,
    DialogTrigger, Input, Ratings
} from "@/shared/ui-toolkit";
import {ScheduleCourse} from "@/entities/schedule";
import {ReactElement, useState} from "react";
import {useCourseForm} from "./useCourseForm";
import {Controller} from "react-hook-form";

interface CourseFeedbackHintProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactElement<HTMLButtonElement>;
    course: ScheduleCourse;
}

export function CourseFeedbackHint({ course, children, ...props }: CourseFeedbackHintProps) {
    const [open, setOpen] = useState(false);
    const { onSubmit, ...form} = useCourseForm(course);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent {...props}>
            <DialogTitle asChild>
                <h2 className='text-lg'>
                    Feedback for course
                </h2>
            </DialogTitle>
                <form className='flex flex-col gap-4' onSubmit={onSubmit}>
                    <Controller name='time' control={form.control} render={({field}) => (
                        <div className='relative flex flex-col'>
                            <label className='font-bold' htmlFor='feedback-sphere'>Time allocation</label>
                            <p className='text-sm text-foreground'>
                                How well does this course fit your time preferences?
                            </p>
                            <input type='number' className='absolute invisible' {...field} />
                            <Ratings className='mt-2' onChange={field.onChange}/>
                        </div>
                    )}/>
                    <Controller name='sphere' control={form.control} render={({field}) => (
                        <div className='relative flex flex-col'>
                            <label className='font-bold' htmlFor='feedback-sphere'>Interests</label>
                            <p className='text-sm text-foreground'>
                                How good does this course fit your studying interests
                            </p>
                            <input type='number' className='absolute invisible' {...field} />
                            <Ratings className='mt-2' onChange={field.onChange}/>
                        </div>
                    )}/>
                    <div className='relative flex flex-col'>
                        <label className='font-bold' htmlFor='feedback-sphere'>Feedback</label>
                        <p className='text-sm text-foreground'>
                            Please provide further feedback on why this course is good or bad for your schedule
                        </p>
                        <Input className='mt-2' {...form.register('feedback')} />
                    </div>
                    <div className='relative flex flex-col'>
                        <label className='font-bold' htmlFor='feedback-sphere'>Suggestions</label>
                        <p className='text-sm text-foreground'>
                            Which courses would better fit your schedule? Focus on what can be improved according to this choice
                        </p>
                        <Input className='mt-2' {...form.register('suggestions')} />
                    </div>
                    <DialogFooter>
                        <Button type='button' onClick={() => setOpen(false)} variant='ghost'>Cancel</Button>
                        <Button type='submit' variant='default'>Submit</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}