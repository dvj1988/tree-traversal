function toLinkedList(data, uniqueKeys, childrenKey, parent = null) {
  let linkedList = [];
  for (let i = 0; i < data.length; i++) {
    const currentObj = Object.assign({}, data[i]);
    // Delete the children from current obj
    delete currentObj[childrenKey];
    // Construct the parent obj with all the unique keys
    const parentObj = parent
      ? uniqueKeys.reduce((acc, uniqueKey) => {
          if (parent[uniqueKey])
            return {
              ...acc,
              [uniqueKey]: parent[uniqueKey]
            };
          return acc;
        }, {})
      : null;

    // Check if the parent has atlease one unique key value
    if (parentObj && Object.keys(parentObj).length === 0)
      throw new Error("One of the entities do not have any of the unique keys");

    linkedList.push({
      ...currentObj,
      parent: parentObj
    });

    // If the current obj has children, execute the linkedList conversion on its children
    if (data[i][childrenKey] && data[i][childrenKey].length > 0) {
      const childTreeLL = toLinkedList(
        data[i][childrenKey],
        uniqueKeys,
        childrenKey,
        data[i]
      );
      linkedList = linkedList.concat(childTreeLL);
    }
  }

  return linkedList;
}

export default toLinkedList;
