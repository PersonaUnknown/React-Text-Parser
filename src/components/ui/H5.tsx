import { cn } from "@sglara/cn";
import { memo } from "react";
const H5 = ({
    className="",
    contents
}: HeaderProps) => {
    return (
        <h5 className={cn(
            "text-sm mt-6 mb-4 font-medium",
            className
        )}>
            {contents}
        </h5>
    )
}

interface HeaderProps {
    className?: string;
    contents: string
}

export default memo(H5);
