/**
 * Regex that checks a valid header:
 *   - No tab or more than 3 spaces at front
 *   - Detects if after that, there are 1-6 # characters
 *   - Ensures that the #s is divided by a space
 */
export const headerRegex = /^(?!\t)^(\s{0,3})\#{1,6}\s[^\n]+/gm;

/**
 * Regex that checks for a valid blockquote:
 *   - No tab or more than 3 spaces at front
 *   - Any number of > characters is allowed at start
 *   - > characters can be divided by spaces so long as there is no non-space character between
 *   - Does not need a space between > and non-space character
 */
export const blockquoteRegex = /^(?!\t)^(\s{0,3})\>\s?[^\n]+/gm;

/**
 * Regex that checks for an unordered list
 *   - Able to include tabs and spaces at front (just no non-space characters)
 *   - Detectable list element via +, -, and *
 */
export const unorderedListRegex = /^[ \t]*[\+\-\*] [^\n]+/gm;

/**
 * Regex that checks for an ordered list
 *   - Able to include tabs and spaces at front (jsut no non-space characters)
 *   - Detectable list element via format -> EX: 1. 2. 3. etc.
 */
export const orderedListRegex = /^[ \t]*[\d]{1,9}. [^\n]+/gm;

/**
 * Regex that checks for a link
 *   -
 *   -
 */
export const linkRegex = /\([^\(\)]+\)\[[^\[\]]+\]/gm; 
// const emphasisRegex = "/\*{2}[^\*]+\*{2}|\_{2}[^\_]+\_{2}/g";
// const italicRegex = "/\*{1}[^\*]+\*{1}|\_{1}[^\_]+\_{1}/g";

/**
 * Mapping of regular expressions to find specific block structures / inline element
 */
export const regexMap: Map<string, RegExp> = new Map([
    ["header", headerRegex],
    ["blockquote", blockquoteRegex],
    ["unorderedlist", unorderedListRegex],
    ["orderedlist", orderedListRegex]
]);