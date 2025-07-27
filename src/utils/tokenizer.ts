import type { ASTNode, SyntaxType } from "../types/ast"
// export interface ASTNode {
//     type: SyntaxType;
//     value: string;
//     raw: string;
//     start: number;
//     end: number;
//     children: ASTNode[];
// }

// export type SyntaxType = "Document" | "Paragraph" | "Emphasis" | "Italic";
const exampleDocument: ASTNode = {
    type: "Document",
    value: "This is text",
    raw: "This is text",
    start: 0,
    end: 11,
    children: [

    ]
}

export const tokenize = (text: string) => {
    
}