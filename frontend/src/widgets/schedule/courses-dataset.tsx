import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Input, Label } from '@/shared/ui-toolkit';

type FormData = {
    search: string;
    file: FileList;
};

export function CoursesDataset() {
    const { control, handleSubmit } = useForm<FormData>();
    const [fileName, setFileName] = useState('');

    const onSubmit = (data: FormData) => {
        console.log('Search:', data.search);
        if (data.file.length > 0) {
            console.log('File:', data.file[0]);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
        } else {
            setFileName('');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label className='text-2xl' htmlFor="search">Search Courses</Label>
                <Controller
                    name="search"
                    control={control}
                    render={({ field }) => <Input id="search" {...field} placeholder="Search courses..." />}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="file">Upload Excel File</Label>
                <Input
                    id="file"
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                    className="hidden"
                />
                <label htmlFor="file" className="cursor-pointer">
                    <div className="flex items-center justify-between border p-2 rounded">
                        <span>{fileName || 'Choose a file...'}</span>
                        <Button asChild size="sm" variant="ghost">
                            <span>Browse</span>
                        </Button>
                    </div>
                </label>
            </div>
            <Button type="submit" variant="secondary">Confirm Changes</Button>
        </form>
    );
}