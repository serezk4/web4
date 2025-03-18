import {UserCircle} from "lucide-react";
import {Button} from "@/shared/ui-toolkit";
import {StudentUser} from "@/entities/auth";

interface CurrentStudentProps {
    currentStudent: StudentUser;
    reset: () => void;
}

export function CurrentStudent({ currentStudent, reset }: CurrentStudentProps) {
    return (
        <div className='flex flex-col gap-4 md:flex-row md:gap-8 items-center'>
            <div className='p-8 border rounded-xl w-min'>
                <UserCircle size={80}/>
            </div>
            <div className='flex flex-col gap-2'>
                <h3>
                    <span className='font-bold'>Name:</span> {currentStudent.preferredName}
                </h3>
                <h3>
                    <span className='font-bold'>Mail:</span> {currentStudent.email}
                </h3>
                <Button className='mt-4 w-min' onClick={reset}>Change Student</Button>
            </div>
        </div>
    )
}