import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {ScheduleCourse} from "@/entities/schedule";
import {toast} from "sonner";

const scheme = z.object({
    time: z.number()
        .int()
        .min(1)
        .max(5),
    sphere: z.number()
        .int()
        .min(1)
        .max(5),
    feedback: z.string()
        .max(1000)
        .optional(),
    suggestions: z.string()
        .max(1000)
        .optional()
});

type SchemeType = z.infer<typeof scheme>;

export const useCourseForm = (course: ScheduleCourse) => {
    const form = useForm<SchemeType>({
        resolver: zodResolver(scheme),
        defaultValues: {
            time: 1,
            sphere: 1,
            feedback: '',
            suggestions: ''
        }
    });

    const onSubmit = form.handleSubmit((data) => {
        const finalData = {
            ...data,
            course_id: course.id
        };

        toast(JSON.stringify(finalData, null, 2));

        //TODO: POST request to submit feedback
    });

    return { onSubmit, ...form};
}