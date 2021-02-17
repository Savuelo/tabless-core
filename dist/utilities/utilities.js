"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = void 0;
/*
  Checks is variable function
  also returns a false if variable is undefined
*/
var isFunction = function (functionToTest) {
    return !!(functionToTest && functionToTest.constructor && functionToTest.call && functionToTest.apply);
};
exports.isFunction = isFunction;
