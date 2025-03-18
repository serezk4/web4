import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {Button, Label, RadioGroup, RadioGroupItem} from "@/shared/ui-toolkit";

import { z } from "zod";

const generalPreferencesSchema = z.object({
    studyFormat: z.enum(['online', 'offline']),
});

type GeneralPreferencesType = z.infer<typeof generalPreferencesSchema>;

export function GeneralPreferencesForm() {
    const { control, handleSubmit } = useForm<GeneralPreferencesType>({
        resolver: zodResolver(generalPreferencesSchema),
        defaultValues: {
            studyFormat: 'offline',
        },
    });

    const onSubmit = (data: GeneralPreferencesType) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <h3 className="py-4 text-xl">General information</h3>
            <Controller
                name="studyFormat"
                control={control}
                render={({ field }) => (
                    <RadioGroup onValueChange={field.onChange} {...field}>
                        <h4>Study format</h4>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="offline" id="r1"/>
                            <Label htmlFor="r1">Offline</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="online" id="r2"/>
                            <Label htmlFor="r2">Online</Label>
                        </div>
                    </RadioGroup>
                )}
            />
            <div className="flex justify-end">
                <Button type="submit" variant="secondary">Submit</Button>
            </div>
        </form>
    );
}