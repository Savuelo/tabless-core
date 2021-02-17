"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeInvalidElements = exports.isObjectValid = exports.isObjectEmpty = exports.isFunction = void 0;
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
var removeInvalidElements = function (array) {
    return array.filter(function (object) {
        return exports.isObjectValid(object);
    });
};
exports.removeInvalidElements = removeInvalidElements;
