import { ColumnConfig, ColumnCell } from './models/Interfaces';
import { isFunction } from './utilities/utilities.js';
export default class Tabless {
  columnsConfig: ColumnConfig[]; //Configs of every column that table have 
  data: any[]; //Data displated in column
  
  tableArray: ColumnCell[][] = [];

  constructor(columnsConfig: ColumnConfig[], data: any[]) {
    this.columnsConfig = columnsConfig;
    this.data = data;

    this.tableArray = this.formatNewData(this.columnsConfig, this.data);
  }

  /*
    Prepares data ready to be mapped to table element;
    sets 2D array of ColumnField with columns and rows of table data;

    Data is formated with provided functions;
    if no function formater is provided by end user saves raw data;
  */
  formatNewData(columnsConfig: ColumnConfig[], data: any[]): ColumnCell[][] {
    const headers : ColumnCell[] = this.getTableHeaderNames(columnsConfig);// array with column names;
    const table: ColumnCell[][] = []; //Temp variable with 2d array of rows and columns data

    // first index (0) of tableArray is row with table headers!;
    table.push(headers);

    // for Each - every table ROW
    data.forEach((row)=>{
      const rowValues: ColumnCell[] = [];

      //  for loop; calls for every column in table (in specific row)
      columnsConfig.forEach(({columnIndex, columnFormat, columnClassName}: ColumnConfig)=>{
        //Value of field in column; if not defined set it to empty string
        const field: ColumnCell = {
          value: row[columnIndex] ?? '',
          className: columnClassName ?? '',
        }

        //format value by user provided format function
        if(columnFormat && isFunction(columnFormat)){
          field.value = columnFormat(field.value);
        }

        rowValues.push(field);
      })
      table.push(rowValues);
    })

    return table;
  }

  /*
    returns an array of strings with column names;
  */
  getTableHeaderNames(columnsConfig: ColumnConfig[]) : ColumnCell[] {
    const headers: ColumnCell[] = [];
    columnsConfig.forEach((v)=>{
      headers.push({
        value: v.columnName,
        className: v.columnClassName ?? ''
      });
    }) 
    return headers;
  }
  
  /*
    Method that will be overrided in other module;
    In core its just "virtual" like method;

    By default returns null;
  */
  renderWay = (_tableArray: ColumnCell[][]) => {
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