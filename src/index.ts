import { ColumnConfig, TableConfig, Cell } from './models/Interfaces';
import { createDataCell, createCellFromRawData } from './utilities/Formating.js';

export default class Tabless {
  columnsConfig: ColumnConfig[]; //Configs of every column that table have 
  data: any[]; //Data displated in column

  config: TableConfig = { //Default configuration on Tabless instance;
    addOrdinalNumber: false,
    ordinalHeader: 'No.',
    ordinalColumnClassName: 'ordinal',
  };
  
  //Aray that stores formated table data;
  tableArray: Cell[][] = [];

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
  formatData(columnsConfig: ColumnConfig[], data: any[]): Cell[][] {
    const headers : Cell[] = this.getTableHeaderNames(columnsConfig);// array with column names;
    const table: Cell[][] = []; //Temp variable with 2d array of rows and columns data

    // first index (0) of tableArray is row with table headers!;
    table.push(headers);

    // for Each - every table ROW
    data.forEach((row, index)=>{
      const rowValues: Cell[] = [];

      // Add ordinal number if user provided that request in config
      if(this.config.addOrdinalNumber){
        const currentOrdinal: number = index + 1;
        const className: string = this.config.ordinalColumnClassName ?? 'ordinal';

        const cell: Cell = createCellFromRawData(currentOrdinal.toString(), className);
        rowValues.push(cell);
      }

      //  for loop; calls for every column in table (in specific row)
      columnsConfig.forEach((columnConfig: ColumnConfig)=>{
        const cell: Cell = createDataCell(row, columnConfig)
        rowValues.push(cell);
      })
      table.push(rowValues);
    })

    return table;
  }

  /*
    returns an array of strings with column names;
  */
  getTableHeaderNames(columnsConfig: ColumnConfig[]) : Cell[] {
    const headers: Cell[] = [];

    // If ordinary cell is request add header
    if(this.config.addOrdinalNumber){
      const value =  this.config.ordinalHeader ?? 'No.';
      const className = this.config.ordinalColumnClassName ?? 'ordinal';

      const ordinaryHeaderCell: Cell = createCellFromRawData(value, className);
      headers.push(ordinaryHeaderCell);
    }

    //create header cell
    columnsConfig.forEach(({columnName, columnClassName})=>{
      const headerCell: Cell = createCellFromRawData(columnName, columnClassName);
      headers.push(headerCell);
    }) 
    return headers;
  }
  
  /*
    Method that will be overrided in other module;
    In core its just "virtual" like method;

    By default returns null;
  */
  renderWay = (_tableArray: Cell[][]) => {
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