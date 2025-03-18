import {useMemo, useRef, useState} from 'react';
import {Button, Card, Input, Label, Table} from '@/shared/ui-toolkit';
import {ScheduleCourse} from "@/entities/schedule";
import {PaginateCourses} from "@/features/schedule";
import {coursesMock} from "@/widgets/schedule/mock";
import {Car} from "lucide-react";

export function SearchCourses() {
    const [searchTerm, setSearchTerm] = useState('');
    const pageSize = useRef(10);

    const columns: { label: string, accessor: keyof ScheduleCourse }[] = [
        { label: 'Title', accessor: 'title' },
        { label: 'Semester', accessor: 'semester' },
        { label: 'Credit Hours', accessor: 'creditHours' },
        { label: 'Time', accessor: 'time' },
        { label: 'Weekdays', accessor: 'weekdays' },
    ];

    const [currentBegin, setCurrentBegin] = useState(0);
    const handlePageChange = (page: number) => {
        setCurrentBegin((page - 1) * pageSize.current);
    };

    const finalDataset = useMemo(() => {
        const result = coursesMock.filter(course =>
            course.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const maxPages = Math.ceil(result.length / pageSize.current);
        if (currentBegin >= result.length) {
            setCurrentBegin((maxPages - 1) * pageSize.current);
        }

        return result;
    }, [coursesMock, searchTerm, currentBegin, pageSize.current]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label className='text-2xl' htmlFor="search">Search Courses</Label>
                <div className='flex gap-2'>
                    <Input
                        className='flex-grow'
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search courses..." />
                    <div className='flex items-center relative'>
                        <Button asChild variant='secondary' className='pointer-events-none'>
                            <div>
                                Upload
                            </div>
                        </Button>
                        <Input accept=".xls,.xlsx" className='opacity-0 absolute top-0 bottom-0 left-0 right-0 z-10' type='file' placeholder='Upload new' />
                    </div>
                </div>
            </div>
            <Table
                data={finalDataset}
                columns={columns}
                begin={currentBegin}
                end={currentBegin + pageSize.current} />
            <PaginateCourses
                pageSize={pageSize.current}
                currentBegin={currentBegin}
                overallSize={finalDataset.length}
                onChange={handlePageChange} />
        </div>
    );
}