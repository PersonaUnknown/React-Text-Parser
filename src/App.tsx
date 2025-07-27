import Parser from './components/Parser';
import './App.css'

function App() {
  // Setup
  const baseParagraphData = [
    "# Markdown syntax guide",
    "",
    "## Headers",
    "# This is a Heading h1",
    "## This is a Heading h2",
    "### This is a Heading h3",
    "#### This is a Heading h4",
    "##### This is a Heading h5",
    "###### This is a Heading h6",
    "",
    "## Emphasis",
    "*This text will be italic*",  
    "_This will also be italic_",
    "## Links",
    "Example of link: [Google](https://google.com/)",
    "## Blockquotes",
    "> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz",
    ">",
    ">>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor."
  ]
  // Render
  return (
    <div className="container flex flex-col mx-auto p-6">
      <Parser 
        className="flex flex-col mx-auto"
        content={baseParagraphData} 
      />
    </div>
  );
}

export default App
