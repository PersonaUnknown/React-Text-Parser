import { cn } from "@sglara/cn";
import { memo } from "react";
const H1 = ({
    className="",
    contents
}: HeaderProps) => {
    return (
        <h1 className={cn(
            "text-[32px] mt-6 mb-4 pb-2 font-bold border-b-2 border-b-gray-200",
            className
        )}>
            {contents}
        </h1>
    )
}

interface HeaderProps {
    className?: string;
    contents: string
}

export default memo(H1);
