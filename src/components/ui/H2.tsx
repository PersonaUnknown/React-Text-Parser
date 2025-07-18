import { cn } from "@sglara/cn";
import { memo } from "react";
const H2 = ({
    className="",
    contents
}: HeaderProps) => {
    return (
        <h2 className={cn(
            "text-2xl mt-6 mb-4 pb-2 border-b-2 border-gray-200 font-semibold",
            className
        )}>
            {contents}
        </h2>
    )
}

interface HeaderProps {
    className?: string;
    contents: string
}

export default memo(H2);
