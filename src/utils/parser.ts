import type { MarkdownContainer, MarkdownText } from "../types/types";
const specialCharacters = new Set<string>([
    "#",
    "*",
    "_"
]);

const specialSyntax = new Set<string>([
    "#",
    "##",
    "###",
    "####",
    "#####",
    "######"
])

const containerMap = new Map<string, MarkdownContainer>();
containerMap.set("#", "H1");
containerMap.set("##", "H2");
containerMap.set("###", "H3");
containerMap.set("####", "H4");
containerMap.set("#####", "H5");
containerMap.set("######", "H6");

const isCodeBlockSyntax = (text: string): boolean => {
    let numSpaces = 0;
    for (const character of text) {
        if (character === " ") {
            numSpaces++;
        } else if (character === "\t") {
            return true;
        } else {
            break;
        }
    }
    return numSpaces >= 4;
}

const isHeader = (container: MarkdownContainer): boolean => {
    const headers = [
        "H1",
        "H2",
        "H3",
        "H4",
        "H5",
        "H6"
    ];
    return headers.includes(container);
}

/**
 * Parse a single line of text into MarkdownText
 * @param text the line of text as input
 * @param index optional value applied to the key of the output
 * @returns 
 */

const parseLineOfText = (text: string, index = 0): MarkdownText => {
    let currContainer: MarkdownContainer = "P";
    const isCodeBlock = isCodeBlockSyntax(text);
    
    let currContent = "";
    let currSpecialCharacters = "";

    if (isCodeBlock) {
        return {
            id: "CODE_BLOCK-0",
            container: "CODE_BLOCK",
            content: text.trim()
        }
    }

    let determinedContainerType = false;
    for (const character of text) {
        switch (character) {
            case "#":
                if (determinedContainerType) {
                    currContent += character;
                } else {
                    currSpecialCharacters += character;
                }
                break;
            case " ":
                if (!determinedContainerType && specialSyntax.has(currSpecialCharacters)) {
                    determinedContainerType = true;
                    const determinedContainer = containerMap.get(currSpecialCharacters);
                    if (determinedContainer) {
                        currContainer = determinedContainer;
                    }
                } else {
                    currContent += character;
                }
                break;
            default:
                if (!determinedContainerType) {
                    determinedContainerType = true;
                    currContainer = "P";
                    currContent += currSpecialCharacters;
                }
                currContent += character;
                break;
        }
    }

    if (isHeader(currContainer)) {
        currContent = currContent.trimStart();
    }

    return {
        id: `${currContainer}-${index}`,
        container: currContainer,
        content: currContent
    }
}

/**
 * Parses a line of text for special text effects (bold, italic, etc.)
 * @param line line of text needed to be parsed
 * Italics: Contain text within * characters. * must be adjacent to a non-space character.
 */
export const parseSpecialLineOfText = (line: string) => {
    const text = [];
    let currContent = "";
    let tempContent = "";
    let isSpecText = false;
    let specialCharContent = "";
    const specialCharacters: Set<string> = new Set<string>([
        "*",
        "_"
    ]);
    const charIndices: Map<string, number[]> = new Map([
        ["*", []],
        ["_", []],
    ]);

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        // const indices = charIndices.get(char);
        // if (indices) {
        //     indices.push(i);
        //     charIndices.set(char, indices);
        // }

        // if (specialCharacters.has(char)) {
        //     isSpecText = true;
        // }

        if (char === "*") {
            isSpecText = true;
            tempContent += char;
        } else {
            if (isSpecText) {
                specialCharContent += char;
            }
        }
    }
}

/**
 * Parses several lines of text into MarkdownText[] 
 * @param lines Lines of text to be parsed into their appropriate components
 */
export const parseLinesOfText = (lines: string[]): MarkdownText[] => {
    let index = 0;
    const output: MarkdownText[] = [];
    for (const line of lines) {
        if (line !== "") {
            const parsedLine = parseLineOfText(line, index++);
            output.push(parsedLine);
        } else {
            output.push({
                id: "br",
                container: "BR",
                content: "<br />"
            })
        }
    }
    const cleanedUpOutput = parseCleanup(output);
    return cleanedUpOutput;
}

/**
 * @param data 
 * @returns cleaned up data that combines Paragraphs
 */
const parseCleanup = (data: MarkdownText[]): MarkdownText[] => {
    const newData: MarkdownText[] = [];
    let currContainer: MarkdownContainer | null = null;
    let currCombinedData: MarkdownText | null = null;

    for (const entry of data) {
        const { container, content } = entry;
        if (currCombinedData && container !== currContainer) {
            newData.push(currCombinedData);
            currCombinedData = null;
        } else if (container === currContainer && container === "P") {
            if (currCombinedData) {
                currCombinedData.content += ` ${content}`;
            } else {
                currCombinedData = entry;
            }
        } else if (container === "P") {
            currCombinedData = entry;
        } else if (container === "BR") {
        } else {
            newData.push(entry);
        }
        currContainer = container;
    }
    if (currCombinedData) {
        newData.push(currCombinedData);
    }
    return newData;
}