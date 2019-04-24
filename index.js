"use strict";
/**
 * Returns the First location of the key value pair in the object.
 * @param {Array} data The collection to traverse through.
 * @param {Object} obj The key value pairs that needs to be searched.
 * The location of the first match will be returned which satisfies all the key value pairs.
 * @param {String} childrenKey The key on an object where its children can be found. This key will be used to get the children of an object.
 * @returns {Array} Returns the indices of the object where the key value pair was found.
 */
function findOne(data, obj, childrenKey) {
  if (!Array.isArray(data))
    throw new TypeError(
      "Input data is not an an iterable collection. Expected an array"
    );

  if (!obj || Object.keys(obj).length === 0)
    throw new TypeError(
      "Input obj is not valid. Expected an object with key value pairs. eg. { id: 1, name : 'John Doe' }"
    );

  if (childrenKey && typeof childrenKey !== "string") {
    throw new TypeError(
      "Expected a string value for children key. eg. In the obj { id: 1, name : 'John Doe', friends: [ ... ] } => friends would be the children key."
    );
  }

  return findChild(data, obj, childrenKey, []);
}

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

export { findOne };
