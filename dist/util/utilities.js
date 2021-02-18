"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeRequestedIndexes = exports.removeInvalidElements = exports.isObjectValid = exports.isObjectEmpty = exports.isFunction = void 0;
/*
  Checks is variable function
  also returns a false if variable is undefined
*/
var isFunction = function (functionToTest) {
    return !!(functionToTest && functionToTest.constructor && functionToTest.call && functionToTest.apply);
};
exports.isFunction = isFunction;
var isObjectEmpty = function (object) {
    return object && Object.keys(object).length === 0 && object.constructor === Object;
};
exports.isObjectEmpty = isObjectEmpty;
var isObjectValid = function (object) {
    return object && !exports.isObjectEmpty(object) && typeof object === 'object';
};
exports.isObjectValid = isObjectValid;
//Remove invalid rows from data object
var removeInvalidElements = function (array) {
    return array.filter(function (object) {
        return exports.isObjectValid(object);
    });
};
exports.removeInvalidElements = removeInvalidElements;
//Remove requested indexes from columns or rows;
var removeRequestedIndexes = function (array, indexes) {
    if (indexes === undefined || indexes === null || !array) {
        return array;
    }
    var indexList = [];
    //Convert to array if single int passed
    if (Array.isArray(indexes)) {
        indexList = indexes;
    }
    else {
        indexList = [indexes];
    }
    //Return filtered array
    return array.filter(function (v, i) {
        var match = false;
        indexList.forEach(function (idToRemove) {
            if (idToRemove < 0 || isNaN(idToRemove))
                return; //skip negative numbers
            if (i === idToRemove) {
                match = true;
            }
        });
        // Every id that match with id to remove will be removed
        return !match;
    });
};
exports.removeRequestedIndexes = removeRequestedIndexes;
