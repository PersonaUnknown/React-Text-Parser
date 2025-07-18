/**
 * Custom paragraph component able to set its contents via an array of content
 * @prop className class for paragraph container (intended for Tailwind styling) 
 */

import { cn } from "@sglara/cn";
import { memo } from "react";
const P = ({
    className="",
    contents
}: ParagraphProps) => {
    // Render
    return (
        <p className={cn(
            className,
            "mx-4 mb-4"
        )}>
            {contents}
        </p>
    );
}

interface ParagraphProps {
    className?: string;
    contents: string;
}

export default memo(P);