import map from "lodash/map";
import filter from "lodash/filter";

/*
  The function is used for data formatting of api response.
*/

const getChildData = (parents, allData) => {
  return map(parents, (item) => {
    const id = item.id;
    item.open = true;
    const parentData = item;
    const data = filter(allData, (item) => item.parent_objective_id === id);
    data.isOpen = false;
    return {
      parents: parentData,
      child: data,
    };
  });
};
export default getChildData;
