/**
 * Recursive Folder component — the core UI building block of the file explorer.
 *
 * Each node in the tree (folder or file) is rendered by this same component.
 * Folders call themselves for every child in explorer.items, which is the
 * classic React recursion pattern used for tree structures.
 *
 * Props:
 * - explorer: node object { id, name, isFolder, items }
 * - handleInsertNode(folderId, name, isFolder): callback to App for tree updates
 *
 * Local state:
 * - expand: whether this folder's children are visible
 * - showInput: controls inline "add new item" input and whether it is a folder/file
 *
 * User interactions:
 * - Click folder row → toggle expand/collapse
 * - "Folder +" / "File +" → show input, auto-expand parent
 * - Enter in input → call handleInsertNode with this folder's id
 * - Blur input → hide input without saving
 */

import { useState } from "react";

function Folder({ handleInsertNode = () => {}, explorer }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);

      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div onClick={() => setExpand(!expand)} className="folder">
          <span>📁 {explorer.name}</span>

          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                className="inputContainer__input"
                autoFocus
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}

          {explorer.items.map((exp) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                key={exp.id}
                explorer={exp}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorer.name}</span>;
  }
}

export default Folder;
