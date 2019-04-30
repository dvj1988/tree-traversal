function findAllChildren(
  children,
  searchObj,
  childrenKey,
  parents = [],
  locations = []
) {
  const searchParamKeys = Object.keys(searchObj);
  for (let i = 0; i < children.length; i++) {
    if (
      eval(
        `${searchParamKeys
          .map(
            key =>
              `(children[${i}]['${key}'] && children[${i}]['${key}'] === searchObj['${key}'])`
          )
          .join(" && ")}`
      )
    ) {
      locations.push([...parents, i]);
    }

    if (children[i][childrenKey] && children[i][childrenKey].length > 0) {
      const newLocations = findAllChildren(
        children[i][childrenKey],
        searchObj,
        childrenKey,
        [...parents, i],
        locations
      );

      if (newLocations.length >= locations.length) {
        locations = newLocations;
      }
    }
  }
  return locations;
}

export default findAllChildren;
