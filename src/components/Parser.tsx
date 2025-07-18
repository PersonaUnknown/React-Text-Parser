import { parseLinesOfText } from "../utils/parser";
import H1 from "./ui/H1";
import H2 from "./ui/H2";
import H3 from "./ui/H3";
import H4 from "./ui/H4";
import H5 from "./ui/H5";
import H6 from "./ui/H6";
import P from "./ui/P";
const Parser = ({
    className="",
    content
}: ParserProps) => {
    // Setup
    const parsedContent = parseLinesOfText(content);
    // Render
    return (
        <div className={className}>
            {parsedContent.map(markdown => {
                const { id, container, content } = markdown;
                switch (container) {
                    case ("P"):
                        return <P key={id} contents={content} />
                    case "H1":
                        return <H1 key={id} contents={content} />
                    case "H2":
                        return <H2 key={id} contents={content} />
                    case "H3":
                        return <H3 key={id} contents={content} />
                    case "H4":
                        return <H4 key={id} contents={content} />
                    case "H5":
                        return <H5 key={id} contents={content} />
                    case "H6":
                        return <H6 key={id} contents={content} />
                    default:
                        return null;       
                }
            })}
        </div>
    );
}

interface ParserProps {
    className?: string;
    content: string[];
}

export default Parser;