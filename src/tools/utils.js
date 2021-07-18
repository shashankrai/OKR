/*
  The function is used for data formatting of api response.
*/

const getChildData = (parentsNodes, allNodes) => {
  let parentId = 0;
  parentId += 1;
  return parentsNodes.map((item) => {
    const { id } = item;
    const parents = item;
    parents.open = true;
    parents.parentId = parentId;
    const child = allNodes.filter((nodes) => nodes.parent_objective_id === id);
    child.isOpen = false;
    return {
      parents,
      child,
    };
  });
};
export default getChildData;
