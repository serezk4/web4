import {useMemo, useState} from "react";
import {studentsMock} from "@/widgets/schedule/mock";
import {StudentUser} from "@/entities/auth";
import {CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/shared/ui-toolkit";
import {Command} from "@/shared/ui-toolkit/command";
import {UserCircle} from "lucide-react";
import {toast} from "sonner";

interface SelectStudentProps {
    onConfirm?: (student: StudentUser) => void;
}

export function SelectStudent({ onConfirm }: SelectStudentProps) {
    const [selectedStudent, setStudent] = useState<StudentUser | null>(null);
    const [value, setValue] = useState('');
    const suggestedList = useMemo(() => {
        return studentsMock.filter(student => (
            student.preferredName.toLowerCase().includes(value.toLowerCase()) ||
            student.email.toLowerCase().includes(value.toLowerCase())
        ));
    }, [value]);

    const handleStudentSelect = (student: StudentUser) => {
        setStudent(student);
        setValue(student.email);
        toast(`Selected ${student.email}`);
        onConfirm && onConfirm(student);
    }

    return (
        <Command>
            <Command className="rounded-lg border shadow-md md:min-w-[450px]">
                <CommandInput value={value} onValueChange={setValue} placeholder='Search for a student' />
                <CommandList>
                    <CommandEmpty>No such student found.</CommandEmpty>
                    <CommandGroup heading='Students' className='flex flex-col gap-2'>
                        {suggestedList.map((student) => (
                            <button className='w-full' type='button' onClick={() => handleStudentSelect(student)} key={student.id}>
                                <CommandItem  className='aria-selected:bg-accent-foreground' aria-selected={student.id === selectedStudent?.id}>
                                    <UserCircle className='w-6 h-6' />
                                    <span>{student.email}</span>
                                </CommandItem>
                            </button>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </Command>
    )
}