import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem, PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/shared/ui-toolkit";
import {useMemo} from "react";

interface PassedCourseProps {
    pageSize: number;
    currentBegin: number;
    overallSize: number;
    maxButtons?: number;
    onChange?: (pageNumber: number) => void;
}

export function PaginateCourses({pageSize, currentBegin, overallSize, maxButtons = 5, onChange}: PassedCourseProps) {
    const pagesAmount = useMemo(() => Math.ceil(overallSize / pageSize), [overallSize, pageSize]);
    const previousVisible = useMemo(() => currentBegin > 0, [currentBegin]);
    const nextVisible = useMemo(() => currentBegin + pageSize < overallSize, [currentBegin, overallSize]);
    const currentPage = useMemo(() => Math.floor(currentBegin / pageSize) + 1, [currentBegin, pageSize]);

    const handleNext = () => {
        onChange && onChange(currentPage + 1);
    }

    const handlePrevious = () => {
        onChange && onChange(currentPage - 1);
    }

    const handleChange = (pageNumber: number) => {
        onChange && onChange(pageNumber);
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={handlePrevious} isActive={previousVisible} />
                </PaginationItem>
                {Array.from({length: Math.min(pagesAmount, maxButtons)}).map((_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink onClick={() => handleChange(index + 1)} isActive={currentPage === index + 1}>
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {pagesAmount > maxButtons && (
                    <PaginationItem>
                        <PaginationEllipsis/>
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationNext onClick={handleNext} isActive={nextVisible} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}