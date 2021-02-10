/*
  Checks is variable function
  also returns a false if variable is undefined
*/
export const isFunction = (functionToTest: Function) : boolean => {
  return !!(functionToTest && functionToTest.constructor && functionToTest.call && functionToTest.apply);
}