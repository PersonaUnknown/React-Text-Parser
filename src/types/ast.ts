/**
 * The building block of an Abstract Syntax Tree
 * Consists of 
 *  - Type of node it is
 *  - Its parsed and raw value
 *  - The indices representing the substring of the original string it uses
 */
export interface ASTNode {
    type: SyntaxType;
    value: string;
    raw: string;
    start: number;
    end: number;
    children: ASTNode[];
}

export type SyntaxType = "Document" | "Paragraph" | "Emphasis" | "Italic";

