import { ColumnConfig } from './models/Interfaces';
import { isFunction } from './utilities/utilities.js';
export default class Table {
  columnsConfig: ColumnConfig[]; //Configs of every column that table have 
  data: any[]; //Data displated in column
  
  tableArray: string[][] = [];

  constructor(columnsConfig: ColumnConfig[], data: any[]) {
    this.columnsConfig = columnsConfig;
    this.data = data;

    this.tableArray = this.formatNewData(this.columnsConfig, this.data);
  }

  /*
    Prepares data ready to be mapped to table element;
    sets 2D array of string with columns and rows of table data;

    Data is formated with provided functions;
    if no function formater is provided by end user saves raw data;
  */
  formatNewData(columnsConfig: ColumnConfig[], data: any[]): string[][] {
    const headers : string[] = this.getTableHeaderNames(columnsConfig);// array with column names;
    const table: string[][] = []; //Temp variable with 2d array of rows and columns data

    // first index (0) of tableArray is row with table headers!;
    table.push(headers);

    // for Each ROW
    data.forEach((row)=>{
      const rowValues: string[] = [];

      //  for loop; calls for every column in table
      columnsConfig.forEach(({columnIndex, columnFormat}: ColumnConfig)=>{
        //Value of field in column; if not defined set it to empty string
        const rawFieldValue: string = row[columnIndex] ?? '';

        //Value of field after formating by userprovided function;
        let formatedFieldValue: string = rawFieldValue;

        if(columnFormat && isFunction(columnFormat)){
          formatedFieldValue = columnFormat(rawFieldValue);
        }

        rowValues.push(formatedFieldValue);
      })
      table.push(rowValues);
    })


    console.log(table);
    return table;
  }

  /*
    returns an array of strings with column names;
  */
  getTableHeaderNames(columnsConfig: ColumnConfig[]) : string[] {
    const headers: string[] = [];
    columnsConfig.forEach((v)=>{
      headers.push(v.columnName);
    }) 
    return headers;
  }
  
  /*
    Method that will be overrided in other module;
    In core its just "virtual" like method;

    By default returns null;
  */
  renderWay = (_tableArray: string[][]) => {
    return null;
  }

  /*
    Calls and returns value of renderWay method;
    Also passes to method values from this class;
    that allows to pass values as props when renderWay is overrieded by 
    other method;

  */
  render = () => {
    return this.renderWay(this.tableArray);
  }
}