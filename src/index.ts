import { ColumnConfig, TableConfig, ColumnCell } from './models/Interfaces';
import { isFunction } from './utilities/utilities.js';

export default class Tabless {
  columnsConfig: ColumnConfig[]; //Configs of every column that table have 
  data: any[]; //Data displated in column

  config: TableConfig = { //Default configuration on Tabless instance;
    addOrdinalNumber: false,
    ordinalHeader: 'No.',
    ordinalColumnClassName: 'ordinal',
  };
  
  //Aray that stores formated table data;
  tableArray: ColumnCell[][] = [];

  constructor(columnsConfig: ColumnConfig[], data: any[], config: TableConfig = {} ) {
    this.columnsConfig = columnsConfig;
    this.data = data;

    this.setConfig(config);
  }

  /*
    Updates current configuration with new configuration provided by user
  */
  setConfig(newConfig: TableConfig) {
    this.config = {...this.config, ...newConfig};
  }
  
  /*
    Prepares data ready to be mapped to table element;
    sets 2D array of ColumnField with columns and rows of table data;

    Data is formated with provided functions;
    if no function formater is provided by end user saves raw data;
  */
  formatData(columnsConfig: ColumnConfig[], data: any[]): ColumnCell[][] {
    const headers : ColumnCell[] = this.getTableHeaderNames(columnsConfig);// array with column names;
    const table: ColumnCell[][] = []; //Temp variable with 2d array of rows and columns data

    // first index (0) of tableArray is row with table headers!;
    table.push(headers);

    // for Each - every table ROW
    data.forEach((row, index)=>{
      const rowValues: ColumnCell[] = [];

      // Add ordinal number if user provided that request in config
      if(this.config.addOrdinalNumber){
        const currentOrdinal: number = index + 1;
        rowValues.push({
          value: currentOrdinal.toString(),
          className: this.config.ordinalColumnClassName ?? 'ordinal',
        })
      }

      //  for loop; calls for every column in table (in specific row)
      columnsConfig.forEach(({columnIndex, columnFormat, columnClassName}: ColumnConfig)=>{
        //Value of field in column; if not defined set it to empty string
        const cell: ColumnCell = {
          value: row[columnIndex] ?? '',
          className: columnClassName ?? '',
        }

        //format value by user provided format function
        if(columnFormat && isFunction(columnFormat)){
          cell.value = columnFormat(cell.value);
        }

        rowValues.push(cell);
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

    if(this.config.addOrdinalNumber){
      headers.push({
        value: this.config.ordinalHeader ?? 'No.',
        className: this.config.ordinalColumnClassName ?? 'ordinal',
      })
    }

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
    //Format array before passing it into renderWay();
    this.tableArray = this.formatData(this.columnsConfig, this.data);

    return this.renderWay(this.tableArray);
  }
}