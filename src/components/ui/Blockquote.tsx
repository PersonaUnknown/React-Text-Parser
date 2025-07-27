const Blockquote = () => {
    return (
        <blockquote className="border-l-4 border-l-[#d1d9e0] mb-4 px-4">
            <p>
                Markdown is a lightweight markup language with plain-text-formatting syntax.
            </p>
            <p>
                Markdown is a lightweight markup language with plain-text-formatting syntax.
            </p>
            <p>
                Markdown is a lightweight markup language with plain-text-formatting syntax.
            </p>
            <blockquote className="border-l-4 border-l-[#d1d9e0] px-4">
            <p>
                Markdown is a lightweight markup language with plain-text-formatting syntax.
            </p>
            </blockquote>
        </blockquote>
    );
}

export default Blockquote;