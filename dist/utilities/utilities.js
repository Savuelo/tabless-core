/*
  Checks is variable function
  also returns a false if variable is undefined
*/
export var isFunction = function (functionToTest) {
    return !!(functionToTest && functionToTest.constructor && functionToTest.call && functionToTest.apply);
};
