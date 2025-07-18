import { cn } from "@sglara/cn";
import { memo } from "react";
const H6 = ({
    className="",
    contents
}: HeaderProps) => {
    return (
        <h6 className={cn(
            "text-xs mt-6 mb-4 text-[#59636e] font-medium",
            className
        )}>
            {contents}
        </h6>
    )
}

interface HeaderProps {
    className?: string;
    contents: string
}

export default memo(H6);
