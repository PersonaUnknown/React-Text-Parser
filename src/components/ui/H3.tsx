import { cn } from "@sglara/cn";
import { memo } from "react";
const H3 = ({
    className="",
    contents
}: HeaderProps) => {
    return (
        <h3 className={cn(
            "text-xl mt-6 mb-4 font-medium",
            className
        )}>
            {contents}
        </h3>
    )
}

interface HeaderProps {
    className?: string;
    contents: string
}

export default memo(H3);
