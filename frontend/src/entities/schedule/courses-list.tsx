import {BaseHTMLAttributes, Children, ReactNode} from "react";

interface CoursesListProps extends BaseHTMLAttributes<HTMLUListElement>{
    children: ReactNode;
}

export function CoursesList({ children, className, ...props }: CoursesListProps) {
    return (
        <ul className={`${className} grid grid-cols-4 gap-2`} {...props}>
            {Children.toArray(children).map((child, key) => (
                <li key={key}>
                    {child}
                </li>
            ))}
        </ul>
    )
}