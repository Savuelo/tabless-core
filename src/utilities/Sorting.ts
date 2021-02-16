export const sortData = (data: any, orderBy: string): any => {
  const sortedData = data.sort((a:any, b:any)=>{
    //Values used to compare;
    let value1 = a[orderBy] ?? '';
    let value2 = b[orderBy] ?? '';

    //Trying to handle different data types
    if(!isNaN(value1) && !isNaN(value2)){
      value1 = parseFloat(value1);
      value2 = parseFloat(value2);
      return value1 - value2;
    }else{
      if(value1.localeCompare){
        return value1.localeCompare(value2.toString());
      }else if(value2.localeCompare){
        return value2.localeCompare(value1.toString());
      }else{
        return 0;
      }
    }
  });

  return sortedData;
}