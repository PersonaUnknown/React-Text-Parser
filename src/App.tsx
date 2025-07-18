import Parser from './components/Parser';
import './App.css'

function App() {
  // Setup
  // const baseParagraphData = [
  //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  //   "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
  //   "exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //   "",
  //   "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat",
  //   "nulla pariatur.",
  //   "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit",
  //   "anim id est laborum."
  // ];
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
    "_This will also be italic_"
  ]
  // Render
  return (
    <div className="container flex mx-auto p-6">
      <Parser 
        className="flex flex-col mx-auto"
        content={baseParagraphData} 
      />
    </div>
  );
}

export default App
