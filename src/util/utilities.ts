/*
  Checks is variable function
  also returns a false if variable is undefined
*/
export const isFunction = (functionToTest: Function) : boolean => {
  return !!(functionToTest && functionToTest.constructor && functionToTest.call && functionToTest.apply);
}
export const isObjectEmpty = (object: any) => {
  return object && Object.keys(object).length === 0 && object.constructor === Object
}
export const isObjectValid = (object: any) => { 
  return object && !isObjectEmpty(object) && typeof object === 'object';
}

export const removeInvalidElements = (array: any) :any => {
  return array.filter((object:any)=>{
    return isObjectValid(object);
  })
}