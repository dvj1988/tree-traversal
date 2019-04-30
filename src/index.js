"use strict";
import findChild from "./utils/findChild";
import toLinkedList from "./utils/toLinkedList";
import findAllChildren from "./utils/findAllChildren";
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

  if (!childrenKey || typeof childrenKey !== "string") {
    throw new TypeError(
      "Expected a string value for children key. eg. In the obj { id: 1, name : 'John Doe', friends: [ ... ] } => friends would be the children key."
    );
  }

  return findChild(data, obj, childrenKey, []);
}

function convertToLinkedList(data, uniqueKeys, childrenKey) {
  if (!Array.isArray(data))
    throw new TypeError(
      "Input data is not an an iterable collection. Expected an array."
    );

  if (!Array.isArray(uniqueKeys)) {
    throw new TypeError(
      "Input uniqueKeys is not an an iterable collection. Expected an array. eg. ['id', 'name']"
    );
  }

  if (uniqueKeys.length === 0)
    throw new TypeError(
      "Input uniqueKeys is not valid. Expected atleast one unique key. eg. ['id']"
    );

  uniqueKeys.forEach(uk => {
    if (!uk || typeof uk !== "string") {
      throw new TypeError(
        "One of Input uniqueKeys is not a valid string. eg. ['id', 'name']"
      );
    }
  });

  if (!childrenKey || typeof childrenKey !== "string") {
    throw new TypeError(
      "Expected a string value for children key. eg. In the obj { id: 1, name : 'John Doe', friends: [ ... ] } => friends would be the children key."
    );
  }

  return toLinkedList(data, uniqueKeys, childrenKey, null);
}

function findAll(data, obj, childrenKey) {
  return findAllChildren(data, obj, childrenKey, [], []);
}

export { findOne, convertToLinkedList, findAll };
