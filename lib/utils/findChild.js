"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

var _default = findChild;
exports["default"] = _default;