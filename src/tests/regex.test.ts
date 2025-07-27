import { expect, test } from "vitest";
import { regexMap } from "../types/regex";

test("header regex detection", () => {
    const tests = [
        "# This is a Heading h1",
        "## This is a Heading h2",
        "### This is a Heading h3",
        "#### This is a Heading h4",
        "##### This is a Heading h5",
        "###### This is a Heading h6",
        "# This is still a Heading h1 #######",
        "# This is still a Heading h1",
        "# This is still a Heading h1",
        "# This is still a Heading h1",
        "    # This is not a Heading",
        "    # This is not a Heading",
        "# ####This is a Heading",
        "#This is not a Heading h1",
        "    # This is not a Heading h1",
        "    # This is not a Heading h1",
        "This is not a Heading h1",
        "This is regular text"
    ];
    const expected = [
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        false,
        false,
        true,
        false,
        false,
        false,
        false,
        false
    ];
    for (let i = 0; i < tests.length; i++) {
        const headerRegex = regexMap.get("header");
        if (!headerRegex) {
            
            throw new Error("Header RegExp not found");
        }
        headerRegex.lastIndex = 0;
        const test = tests[i];
        const expectedResult = expected[i];
        const result = headerRegex.test(test);
        expect(result).toStrictEqual(expectedResult);
    }
});

test("blockquote regex detection", () => {
    const tests = [
        ">Still markdown",
        "> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.",
        ">> Still is markdown",
        ">>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.",
        "> hasdasd",
        " > hasdasd",
        "  > hasdasd",
        "   > hasdasd",
        "    > hasdasd",
        "\t> hasdasd",
        "> >> > This is somehow a valid blockquote"
    ];
    const expected = [
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        false,
        false,
        true
    ];
    for (let i = 0; i < tests.length; i++) {
        const blockquoteRegex = regexMap.get("blockquote");
        if (!blockquoteRegex) {
            
            throw new Error("Blockquote RegExp not found");
        }
        blockquoteRegex.lastIndex = 0;
        const test = tests[i];
        const expectedResult = expected[i];
        const result = blockquoteRegex.test(test);
        expect(result).toStrictEqual(expectedResult);
    }
});

test("unordered list regex detection", () => {
    const tests = [
        "+ First item",
        "* Second item",
        "- Third item",
        "+ Fourth item",
        "    - Indented item",
        "    - Indented item",
        "        - Item",
        "        * Item",
        "as- Indented item",
        "-a Indented item",
        "- a Indented item"
    ];
    const expected = [
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        false,
        false,
        true
    ];
    for (let i = 0; i < tests.length; i++) {
        const unorderedlistRegex = regexMap.get("unorderedlist");
        if (!unorderedlistRegex) {
            
            throw new Error("Blockquote RegExp not found");
        }
        unorderedlistRegex.lastIndex = 0;
        const test = tests[i];
        const expectedResult = expected[i];
        const result = unorderedlistRegex.test(test);
        expect(result).toStrictEqual(expectedResult);
    }
});

test("ordered list regex detection", () => {
    const tests = [
        "1. Item 1",
        "1. Item 2",
        "1. Item 2",
        "999999999. Item 2",
        "3. Item 3",
        "    1. Item 3a",
        "    2. Item 3b",
    ];
    const expected = [
        true,
        true,
        true,
        true,
        true,
        true,
        true
    ];
    for (let i = 0; i < tests.length; i++) {
        const orderedlistRegex = regexMap.get("orderedlist");
        if (!orderedlistRegex) {
            
            throw new Error("Blockquote RegExp not found");
        }
        orderedlistRegex.lastIndex = 0;
        const test = tests[i];
        const expectedResult = expected[i];
        const result = orderedlistRegex.test(test);
        expect(result).toStrictEqual(expectedResult);
    }
});