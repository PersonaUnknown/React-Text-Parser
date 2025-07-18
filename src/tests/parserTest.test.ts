import { expect, test } from "vitest";

// # This is a Heading h1      --> <h1>This is a Heading h1</h1>
// ## This is a Heading h2     --> <h2>This is a Heading h2</h2>
// ###### This is a Heading h6 --> <h6>This is a Heading h6</h6>

// Valid headers
const basicHeader = "# This is a Heading h1";
const basicHeader2 = "## This is a Heading h2";
const basicHeader3 = "### This is a Heading h3";
const basicHeader4 = "#### This is a Heading h4";
const basicHeader5 = "##### This is a Heading h5";
const basicHeader6 = "###### This is a Heading h6";
const leftoverHeader = "# This is still a Heading h1 #######";
const oneSpaceHeader = " # This is still a Heading h1";
const twoSpaceHeader = "  # This is still a Heading h1";
const threeSpaceHeader = "   # This is still a Heading h1";

// Invalid headers
const notBasicHeader = "#This is not a Heading h1";
const fourSpaceHeader = "    # This is not a Heading h1";
const tabSpaceHeader = "    This is not a Heading h1";

// Regular Text
const regularText = "This is regular text";

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

type MarkdownContainer = "P" | "H1" | "H2" | "H3" | "H4" | "H5" | "H6" | "LI" | "CODE_BLOCK";

interface MarkdownText {
    id: string;
    container: MarkdownContainer;
    content: string[];
}

const containerMap = new Map<string, MarkdownContainer>();
containerMap.set("#", "H1");
containerMap.set("##", "H2");
containerMap.set("###", "H3");
containerMap.set("####", "H4");
containerMap.set("#####", "H5");
containerMap.set("######", "H6");

/**
<p>
    This is text that
    <em>works</em>
    hello
</p>

=====================

{
    id: "p-0",
    container: "P",
    content: [
        "This is a text that",
        "**works**",
        "hello"
    ]
}
*/

/**
<h1> This is a header </h1>

===========================

{
    id: "h1-0",
    container: "H1",
    content: [
        "This is a header"
    ]
}
*/

/**
 * Rules (Tabs)
 * 1. Treat four or more spaces and tabs as code block
 * Rules (Header)
 * 1. Header must start with # up to 6 times
 *  a. Cannot start with more than 3 spaces or a tab (because that's a code block)
 */
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

const parseLineOfText = (text: string, index = 0): MarkdownText => {
    let currContainer: MarkdownContainer = "P";
    const content: string[] = [];
    const isCodeBlock = isCodeBlockSyntax(text);
    
    let currContent = "";
    let currSpecialCharacters = "";

    if (isCodeBlock) {
        return {
            id: "CODE_BLOCK-0",
            container: "CODE_BLOCK",
            content: [text.trim()]
        }
    }

    let determinedContainerType = false;
    for (const character of text) {
        if (character === "#") {
            if (determinedContainerType) {
                currContent += character;
            } else {
                currSpecialCharacters += character;
            }
        } else if (character === " ") {
            if (!determinedContainerType && specialSyntax.has(currSpecialCharacters)) {
                determinedContainerType = true;
                const determinedContainer = containerMap.get(currSpecialCharacters);
                if (determinedContainer) {
                    currContainer = determinedContainer;
                }
            } else {
                currContent += character;
            }
        } else {
            if (!determinedContainerType) {
                determinedContainerType = true;
                currContainer = "P";
                currContent += currSpecialCharacters;
            }
            currContent += character;
        }
    }

    if (isHeader(currContainer)) {
        currContent = currContent.trimStart();
    }

    content.push(currContent);

    return {
        id: `${currContainer}-${index}`,
        container: currContainer,
        content: content
    }
}

const exampleParagraphData = [
    "This text is normal",
    "This is also part of the text",
    "",
    "Blah blah blah blah"
];
/**
[
    {
        id: P-0,
        container: P,
        content: [
            "This text is normal",
            "This is also part of the text"
        ]
    },
    {
        id: P-1,
        container: P,
        content: [
            "Blah blah blah blah"
        ]
    }
]
 */

const exampleParagraph2Data = [
    "This text is normal",
    "#This is also part of the text",
    "# Now this is a header",
    "",
    "Blah blah blah blah"
];
/**
[
    {
        id: P-0,
        container: P,
        content: [
            "This text is normal",
            "This is also part of the text"
        ]
    },
    {
        id: H1-2,
        container: H1,
        content: [
            "Now this is a header"
        ]
    },
    {
        id: P-3,
        container: P,
        content: [
            "Blah blah blah blah"
        ]
    },
]
 */
const parseLinesOfText = (text: string[]) => {
    let index = 0;
    for (const line of text) {
        if (line !== "") {
            const parsedLine = parseLineOfText(line, index++);
            console.log(parsedLine);
        }
    }
}

test("Valid paragraph text markdown", () => {
    const exampleParagraphTest = parseLinesOfText(exampleParagraphData);
    const exampleParagraph2Test = parseLinesOfText(exampleParagraph2Data);
});

test("valid regular text markdown", () => {
    const regular = parseLineOfText(regularText);
    const expectedRegularTextOutput = {
        id: "P-0",
        container: "P",
        content: ["This is regular text"]
    };
    expect(regular).toStrictEqual(expectedRegularTextOutput);
});

test("valid header markdown", () => {
    const basicHeaderTest = parseLineOfText(basicHeader);
    const expectedBasicHeaderOutput = {
        id: "H1-0",
        container: "H1",
        content: ["This is a Heading h1"]
    }
    expect(basicHeaderTest).toStrictEqual(expectedBasicHeaderOutput);
    
    const basicHeaderTest2 = parseLineOfText(basicHeader2);
    const expectedBasicHeaderOutput2 = {
        id: "H2-0",
        container: "H2",
        content: ["This is a Heading h2"]
    }
    expect(basicHeaderTest2).toStrictEqual(expectedBasicHeaderOutput2);

    const basicHeaderTest3 = parseLineOfText(basicHeader3);
    const expectedBasicHeaderOutput3 = {
        id: "H3-0",
        container: "H3",
        content: ["This is a Heading h3"]
    }
    expect(basicHeaderTest3).toStrictEqual(expectedBasicHeaderOutput3);

    const basicHeaderTest4 = parseLineOfText(basicHeader4);
    const expectedBasicHeaderOutput4 = {
        id: "H4-0",
        container: "H4",
        content: ["This is a Heading h4"]
    }
    expect(basicHeaderTest4).toStrictEqual(expectedBasicHeaderOutput4);

    const basicHeaderTest5 = parseLineOfText(basicHeader5);
    const expectedBasicHeaderOutput5 = {
        id: "H5-0",
        container: "H5",
        content: ["This is a Heading h5"]
    }
    expect(basicHeaderTest5).toStrictEqual(expectedBasicHeaderOutput5);

    const basicHeaderTest6 = parseLineOfText(basicHeader6);
    const expectedBasicHeaderOutput6 = {
        id: "H6-0",
        container: "H6",
        content: ["This is a Heading h6"]
    }
    expect(basicHeaderTest6).toStrictEqual(expectedBasicHeaderOutput6);

    const leftoverHeaderTest = parseLineOfText(leftoverHeader);
    const expectedLeftoverHeaderTest = {
        id: "H1-0",
        container: "H1",
        content: ["This is still a Heading h1 #######"]
    }
    expect(leftoverHeaderTest).toStrictEqual(expectedLeftoverHeaderTest);

    const oneSpaceHeaderTest = parseLineOfText(oneSpaceHeader);
    const expectedOneSpaceHeaderTest = {
        id: "H1-0",
        container: "H1",
        content: ["This is still a Heading h1"]
    }
    expect(oneSpaceHeaderTest).toStrictEqual(expectedOneSpaceHeaderTest);

    const twoSpaceHeaderTest = parseLineOfText(twoSpaceHeader);
    const expectedTwoSpaceHeaderTest = {
        id: "H1-0",
        container: "H1",
        content: ["This is still a Heading h1"]
    }
    expect(twoSpaceHeaderTest).toStrictEqual(expectedTwoSpaceHeaderTest);

    const threeSpaceHeaderTest = parseLineOfText(threeSpaceHeader);
    const expectedThreeSpaceHeaderTest = {
        id: "H1-0",
        container: "H1",
        content: ["This is still a Heading h1"]
    }
    expect(threeSpaceHeaderTest).toStrictEqual(expectedThreeSpaceHeaderTest);
});

test("invalid header markdown", () => {
    const notBasicHeaderTest = parseLineOfText(notBasicHeader);
    const expectedNotBasicHeaderOutput = {
        id: "P-0",
        container: "P",
        content: ["#This is not a Heading h1"]
    }
    expect(notBasicHeaderTest).toStrictEqual(expectedNotBasicHeaderOutput);

    // TODO: Adjust this when code-block is added
    const fourSpaceHeaderTest = parseLineOfText(fourSpaceHeader);
    const expectedFourSpaceHeaderOutput = {
        id: "CODE_BLOCK-0",
        container: "CODE_BLOCK",
        content: ["# This is not a Heading h1"]
    }
    expect(fourSpaceHeaderTest).toStrictEqual(expectedFourSpaceHeaderOutput);

    const tabSpaceHeaderTest = parseLineOfText(tabSpaceHeader);
    const expectedTabSpaceHeaderOutput = {
        id: "CODE_BLOCK-0",
        container: "CODE_BLOCK",
        content: ["This is not a Heading h1"]
    }
    expect(tabSpaceHeaderTest).toStrictEqual(expectedTabSpaceHeaderOutput);
});
