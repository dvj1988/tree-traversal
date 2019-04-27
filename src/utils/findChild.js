function findChild(children, searchParam, childrenKey, parents = []) {
  let index = [];
  const searchParamKeys = Object.keys(searchParam);
  for (let i = 0; i < children.length; i++) {
    if (
      eval(
        `${searchParamKeys
          .map(
            key =>
              `(children[${i}]['${key}'] && children[${i}]['${key}'] === searchParam['${key}'])`
          )
          .join(" && ")}`
      )
    ) {
      index = [i];
      break;
    }

    if (children[i][childrenKey] && children[i][childrenKey].length > 0) {
      const subIndex = findChild(
        children[i][childrenKey],
        searchParam,
        childrenKey,
        [i]
      );

      if (subIndex) {
        index = [...subIndex];
      }
    }
  }
  if (index.length) {
    return parents.length ? [...parents, ...index] : index;
  }
  return null;
}

export default findChild;
