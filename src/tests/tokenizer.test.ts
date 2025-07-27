// https://spec.commonmark.org/0.31.2/#appendix-a-parsing-strategy
import { expect, test } from "vitest"
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

/**
 * Parse lines of text to generate block structure of document
 * Block structure consists of:
 *   - Headers
 *   - Block Quotes
 *   - Paragraphs 
 *   - Lists      (TODO)
 * All blocks are then parented by the same Document Node
 * @param text 
 */
const generateBlockStructure = (lines: string[]) => {
    const rawText = lines.join("\n");
    const rawTextLength = rawText.length;
    const blockStructures: ASTNode[] = [];
    
    for (const line of lines) {
        
    }
    // For each line, we follow this procedure:
    // First we iterate through the open blocks, starting with the root document, and descending through last children down to the last open block. Each block imposes a condition that the line must satisfy if the block is to remain open. For example, a block quote requires a > character. A paragraph requires a non-blank line. In this phase we may match all or just some of the open blocks. But we cannot close unmatched blocks yet, because we may have a lazy continuation line.
    // Next, after consuming the continuation markers for existing blocks, we look for new block starts (e.g. > for a block quote). If we encounter a new block start, we close any blocks unmatched in step 1 before creating the new block as a child of the last matched container block.
    // Finally, we look at the remainder of the line (after block markers like >, list markers, and indentation have been consumed). This is text that can be incorporated into the last open block (a paragraph, code block, heading, or raw HTML).
    const startNode: ASTNode = {
        type: "Document",
        value: rawText,
        raw: rawText,
        start: 0,
        end: rawTextLength - 1,
        children: blockStructures
    }
}

/**
 * 
 * @param line 
 * @returns if line of text meets the conditions to be a valid 
 */
const isBlockQuote = (line: string): boolean => {
    
    return false;
}

/**
 * Parses line of text from block structure into proper inline elements
 * @param text 
 */
const generateInlineStructure = (text: string) => {

}



const linkRegex = "/\([^\(\)]+\)\[[^\[\]]+\]/g"; 
const emphasisRegex = "/\*{2}[^\*]+\*{2}|\_{2}[^\_]+\_{2}/g";
const italicRegex = "/\*{1}[^\*]+\*{1}|\_{1}[^\_]+\_{1}/g";

test("Tokenizer test", () => {
    const basicTests = [
        "This is text",
        "This is *text*"
    ];
    for (let i = 0; i < basicTests.length; i++) {
        const test = basicTests[i];

    }
});

// https://www.markdownguide.org/basic-syntax/