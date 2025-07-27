import { expect, test } from "vitest";
import type { MarkdownContainer, MarkdownText } from "../types/types";

/** Storing basic rich text: bolding, italics, colors
Frontend
- Requirements: 
    - Being able to stack multiple effects on text
    - Be able to store that text somewhere and pull it back
- Optional desirable effects:
    - Being able to undo or redo actions (Make actions be reversible)
Backend
- Storing a document as a series of nodes. Each node has a type and contents, with a "marks" setting that is a string array of different text effects
    - From: https://www.contentful.com/developers/docs/concepts/rich-text/
- Storing a document as a series of actions. Then, on the backend or frontend, create the document from the list of actions taken
    - Would allow reversible actions (redo and undo functionality)
Data Structure
- Document -> Pages -> Rows -> Rows consist of an JSON array of content:
[
    {
        content: "world",
        effects: []
    },
    {
        content: "    "
        effects: []
    },
    {
        content: "hello"
        effects: [
            "underline",
            "bold",
            "italic"
        ]
    }
] => "<span>world    <span className="underline font-bold italic">hello</span>";

class Document() {
    name: string,
    row: Row[]
}
class Row() {
    nodes: TextNode[]

    space()
    tab()
    bold(index: number, start: number, end: number)
    italic(index: number, start: number, end: number)
    underline(index: number, start: number, end: number)
}
class TextNode() {
    content: string,
    effects: TextEffects[], // or string[] if you don't care about enum categorization of values
    color: string // hex-code to colorize (use black as default)
}
type TextEffects = "underline" | "font-bold" | "italic" | "line-through" 

List of Rich Text Actions
- bold(start: number, end: number)
- rem_bold(start: number, end: number)
- italicize(start: number, end: number)
- rem_italicize(start: number, end: number)
- underline(start: number, end: number)
- rem_underline(start: number, end: number)
- color(start: number, end: number, color: string)
- rem_color(start: number, end: number, color: string)
- tab(row: number, col: number)
- space(row: number, col: number) // Apply a space " " at column index (maxed at string length of Row contents)
*/
const example = "***This should be bold***";
const example2 = "___This should be bold___";

const parse = (text: string) => {
    const output: string[] = [];
    let currText = "";
    const specialCharacters = new Set<string>([
        "*",
        "_"
    ]);

    // Map stores last index of special character
    const freqMap: Map<string, number> = new Map();
    for (const char of specialCharacters) {
        freqMap.set(char, -1);
    }

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const freq = freqMap.get(char) ?? -1;
        switch (char) {
            case "*":
                const diff = Math.abs(i - freq);
                if (diff === 1) {

                }
                break;
            case "_":
                break;
            default:
                break;
        }
    }
}

test("Bold detected", () => {

});