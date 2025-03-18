import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Separator } from "@/shared/ui-toolkit";
import { z } from "zod";

type WeekdayOptions = {
    value: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday" | undefined;
    label: string;
}

const weekdayOptions: WeekdayOptions[] = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' },
];

const scheme = z.object({
    timeRange: z.array(
        z.object({
            day: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
            start: z.string(),
            end: z.string()
        })
    ),
});

type SchemeType = z.infer<typeof scheme>;

export function TimeRangeForm() {
    const { control, handleSubmit } = useForm<SchemeType>({
        resolver: zodResolver(scheme),
        defaultValues: {
            timeRange: weekdayOptions.map(option => ({
                day: option.value,
                start: '',
                end: ''
            }))
        }
    });

    const onSubmit = (data: SchemeType) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <h3 className='py-4 text-xl'>Preferred Weekdays and Time Ranges</h3>
            <div className='grid gap-4' style={{gridTemplateColumns: 'min-content repeat(2, 1fr)'}}>
                {weekdayOptions.map((option, index) => (
                    <div key={option.value} className="grid grid-cols-subgrid" style={{gridColumn: '1/-1'}}>
                        <label className='pr-4'>{option.label}</label>
                        <Controller
                            name={`timeRange.${index}.start`}
                            control={control}
                            render={({field}) => (
                                <Input type="time" {...field} placeholder="Start Time"/>
                            )}
                        />
                        <Controller
                            name={`timeRange.${index}.end`}
                            control={control}
                            render={({field}) => (
                                <Input type="time" {...field} placeholder="End Time"/>
                            )}
                        />
                    </div>
                ))}
            </div>
            <div className='flex justify-end'>
                <Button variant='ghost'>Reset</Button>
                <Button variant='secondary'>Confirm</Button>
            </div>
        </form>
    );
};