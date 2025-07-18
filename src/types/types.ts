/**
 * Different containers to store text data inside
 */
export type MarkdownContainer = "P" | "H1" | "H2" | "H3" | "H4" | "H5" | "H6" | "LI" | "BR" | "CODE_BLOCK";

/**
 * The necessary information to store mark down data
 * @property id: string id for component key
 * @property container: specific MarkdownContainer to render
 * @property content: the text to display inside the container
 */
export interface MarkdownText {
    id: string;
    container: MarkdownContainer;
    content: string;
}