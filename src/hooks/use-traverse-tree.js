/**
 * Custom hook for immutable tree traversal and mutation.
 *
 * The file explorer stores data as a nested tree. This hook encapsulates
 * algorithms that walk the tree to find a target folder and apply changes
 * without scattering recursion logic across components.
 *
 * insertNode(tree, folderId, item, isFolder):
 * - Recursively searches for the folder whose id matches folderId.
 * - When found, prepends a new child node to that folder's items array.
 * - Returns a new tree object (immutable update via spread on the way back up).
 *
 * deleteNode and renameNode are intentionally left as exercises for students.
 */

const useTraverseTree = () => {
  const insertNode = function (tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: [],
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  };

  const deleteNode = () => {}; // Do it Yourself

  const renameNode = () => {}; // Do it Yourself

  return { insertNode, deleteNode, renameNode };
};

export default useTraverseTree;
