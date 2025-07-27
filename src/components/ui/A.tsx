interface AProps {
    contents: string;
    href: string;
}

const A = ({
    contents,
    href
}: AProps) => {
    return (
        <a href={href} className="text-[#0969da]">
            {contents}
        </a>
    );
}

export default A;

