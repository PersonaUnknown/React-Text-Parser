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

test("", () => {
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