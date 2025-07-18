import { cn } from "@sglara/cn";
import { memo } from "react";
const H4 = ({
    className="",
    contents
}: HeaderProps) => {
    return (
        <h4 className={cn(
            "text-base mt-6 mb-4 font-medium",
            className
        )}>
            {contents}
        </h4>
    )
}

interface HeaderProps {
    className?: string;
    contents: string
}

export default memo(H4);
