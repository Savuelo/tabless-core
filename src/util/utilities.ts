import { ColumnConfig } from './../models/Interfaces';
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
export const isColumnConfigValid = (column: ColumnConfig) => {
  return isObjectValid(column) && column.columnIndex && column.columnIndex !== '';
}

//Remove invalid columns config from array, used in constructor or changing some columns
export const removeInvalidColumns = (columns: ColumnConfig[]) : ColumnConfig[] => {
  if(!columns || !Array.isArray(columns)) return [];

  return columns.filter((column) => {
    return isColumnConfigValid(column);
  })
}

//Remove invalid rows from data object
export const removeInvalidRows = (array: any) :any => {
  return array.filter((object:any)=>{
    return isObjectValid(object);
  })
}

//Remove requested indexes from columns or rows;
export const removeRequestedIndexes= (array: any[], indexes: number | number[]) : any[] => { 
  if(indexes === undefined || indexes === null || !array){
    return array;
  }

  let indexList: number[] = [];

  //Convert to array if single int passed
  if(Array.isArray(indexes)){
    indexList = indexes;
  }else{
    indexList = [indexes]
  }

  //Return filtered array
  return array.filter((v, i: number) => {
    let match = false; 

    indexList.forEach((idToRemove)=> {
      if(idToRemove < 0 || isNaN(idToRemove)) return; //skip negative numbers

      if(i === idToRemove){
        match = true;
      }
    })

    // Every id that match with id to remove will be removed
    return !match;
  })
}

