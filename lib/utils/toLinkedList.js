"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function toLinkedList(data, uniqueKeys, childrenKey) {
  var parent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var linkedList = [];

  for (var i = 0; i < data.length; i++) {
    var currentObj = Object.assign({}, data[i]); // Delete the children from current obj

    delete currentObj[childrenKey]; // Construct the parent obj with all the unique keys

    var parentObj = parent ? uniqueKeys.reduce(function (acc, uniqueKey) {
      if (parent[uniqueKey]) return _objectSpread({}, acc, _defineProperty({}, uniqueKey, parent[uniqueKey]));
      return acc;
    }, {}) : null; // Check if the parent has atlease one unique key value

    if (parentObj && Object.keys(parentObj).length === 0) throw new Error("One of the entities do not have any of the unique keys");
    linkedList.push(_objectSpread({}, currentObj, {
      parent: parentObj
    })); // If the current obj has children, execute the linkedList conversion on its children

    if (data[i][childrenKey] && data[i][childrenKey].length > 0) {
      var childTreeLL = toLinkedList(data[i][childrenKey], uniqueKeys, childrenKey, data[i]);
      linkedList = linkedList.concat(childTreeLL);
    }
  }

  return linkedList;
}

var _default = toLinkedList;
exports["default"] = _default;