"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function findAllChildren(children, searchObj, childrenKey) {
  var parents = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var locations = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  var searchParamKeys = Object.keys(searchObj);

  var _loop = function _loop(i) {
    if (eval("".concat(searchParamKeys.map(function (key) {
      return "(children[".concat(i, "]['").concat(key, "'] && children[").concat(i, "]['").concat(key, "'] === searchObj['").concat(key, "'])");
    }).join(" && ")))) {
      locations.push([].concat(_toConsumableArray(parents), [i]));
    }

    if (children[i][childrenKey] && children[i][childrenKey].length > 0) {
      var newLocations = findAllChildren(children[i][childrenKey], searchObj, childrenKey, [].concat(_toConsumableArray(parents), [i]), locations);

      if (newLocations.length >= locations.length) {
        locations = newLocations;
      }
    }
  };

  for (var i = 0; i < children.length; i++) {
    _loop(i);
  }

  return locations;
}

var _default = findAllChildren;
exports["default"] = _default;