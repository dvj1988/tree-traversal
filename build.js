"use strict";
/**
 * Returns the First location of the key value pair in the object.
 * @param {Array} data The collection to traverse through.
 * @param {Object} obj The key value pairs that needs to be searched.
 * The location of the first match will be returned which satisfies all the key value pairs.
 * @param {String} childrenKey The key on an object where its children can be found. This key will be used to get the children of an object.
 * @returns {Array} Returns the indices of the object where the key value pair was found.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findOne = findOne;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function findOne(data, obj, childrenKey) {
  if (!Array.isArray(data)) throw new TypeError("Input data is not an an iterable collection. Expected an array");
  if (!obj || Object.keys(obj).length === 0) throw new TypeError("Input obj is not valid. Expected an object with key value pairs. eg. { id: 1, name : 'John Doe' }");

  if (childrenKey && typeof childrenKey !== "string") {
    throw new TypeError("Expected a string value for children key. eg. In the obj { id: 1, name : 'John Doe', friends: [ ... ] } => friends would be the children key.");
  }

  return findChild(data, obj, childrenKey, []);
}

function findChild(children, searchParam, childrenKey) {
  var parents = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var index = [];
  var searchParamKeys = Object.keys(searchParam);

  var _loop = function _loop(i) {
    if (eval("".concat(searchParamKeys.map(function (key) {
      return "(children[".concat(i, "]['").concat(key, "'] && children[").concat(i, "]['").concat(key, "'] === searchParam['").concat(key, "'])");
    }).join(" && ")))) {
      index = [i];
      return "break";
    }

    if (children[i][childrenKey] && children[i][childrenKey].length > 0) {
      var subIndex = findChild(children[i][childrenKey], searchParam, childrenKey, [i]);

      if (subIndex) {
        index = _toConsumableArray(subIndex);
      }
    }
  };

  for (var i = 0; i < children.length; i++) {
    var _ret = _loop(i);

    if (_ret === "break") break;
  }

  if (index.length) {
    return parents.length ? [].concat(_toConsumableArray(parents), _toConsumableArray(index)) : index;
  }

  return null;
}
