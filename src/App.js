/**
 * Root application component for the Recursive File Explorer.
 *
 * Responsibilities:
 * - Holds the entire folder tree in React state (explorerData).
 * - Delegates tree mutations to the useTraverseTree custom hook.
 * - Renders a single top-level Folder component that recursively renders
 *   the full hierarchy.
 *
 * Data flow:
 * 1. Initial tree comes from src/data/folderData.js.
 * 2. User adds a file/folder inside Folder → handleInsertNode is called.
 * 3. insertNode returns an updated tree → setExplorerData triggers re-render.
 */

import { useState } from "react";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/use-traverse-tree";
import "./styles.css";
import explorer from "./data/folderData";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  return (
    <div className="App">
      <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
    </div>
  );
}
