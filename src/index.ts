import { ColumnConfig, TableConfig, TableRow } from './models/Interfaces';
import { sortData } from './util/Sorting';
import { generateTableBody } from './util/tableGenerating/TableBody';
import { generateHeaders } from './util/tableGenerating/TableHeaders';
import { isColumnConfigValid, isObjectValid, removeInvalidColumns, removeInvalidRows, removeRequestedIndexes } from './util/utilities'

export default class Tabless {
  columnsConfig: ColumnConfig[] = []; //Configs of every column that table have 
  data: any[] = []; //Data displated in column

  config: TableConfig = { //Default configuration on Tabless instance;
    addOrdinalNumber: false,
    ordinalHeader: 'No.',
    ordinalColumnClassName: 'ordinal',
    orderBy: undefined,
    descending: false,
    headerless: false,
  };

  constructor(columnsConfig: ColumnConfig[] = [], data: any[] = [], config: TableConfig = {} ) {
    this.columnsConfig = removeInvalidColumns(columnsConfig);
    this.data = removeInvalidRows(data);

    this.setConfig(config);
  }

  /*
    Updates current configuration with new configuration provided by user
  */
  setConfig(newConfig: TableConfig) {
    this.config = {...this.config, ...newConfig};
  }

  /*
    Return basic params of tabless
  */
  getColumns() { 
    return this.columnsConfig;
  }
  getData() {
    return this.data;
  }


  /*
    Replace current columns config with new columns config set
  */
  replaceColumns(newColumnsSet: ColumnConfig[]){
    if(newColumnsSet && Array.isArray(newColumnsSet)){
      this.columnsConfig = removeInvalidColumns(newColumnsSet);
    }
  }

  /*
    Replace current data object
  */
  replaceData(newData: any){
    this.data = removeInvalidRows(newData);
  }

  /*
    Add new column(s) to the table
  */
  addColumns(newColumns: ColumnConfig[] | ColumnConfig){
    if(!newColumns) return;

    let newColumnsArray: ColumnConfig[] = [];

    //Check is newColumns array or no
    if(!Array.isArray(newColumns)){
      newColumnsArray = [newColumns];
    }else{
      newColumnsArray = newColumns;
    }

    newColumnsArray.forEach((element) => {
      if(isColumnConfigValid(element)){
        this.columnsConfig.push(element);
      }
    });
  }
  /*
    Remove column by its id (userProvided id)
  */
  removeColumnsById(columnIdsToRemove: string | string[] | number | number[]){
    if(!columnIdsToRemove) return;

    this.columnsConfig = this.columnsConfig.filter(({columnId})=> {

      if(Array.isArray(columnIdsToRemove)){
        //If passed an array as param, check if any in in that array is equal with this columnId;
        //Note that output of some is negated! (> ! <)
        return !columnIdsToRemove.some((idToRemove: any)=>{
          return columnId == idToRemove;
        })
      }else{
        //If passed just number or string compare and remove.
        return columnId != columnIdsToRemove;
      }
    })
  }
  /*
    Remove column by its index in array;
  */
  removeColumnsByIndex(indexInArray: number | number[]){
    this.columnsConfig = removeRequestedIndexes(this.columnsConfig, indexInArray);
  }

  /*
    Add new row to existing table;
    if new row will be added at beggining it will affect other rows absolute id
  */
  addRows(newRows: any | any[], atBeginning: boolean = false){
    if(isObjectValid(newRows)){
      let rowsArray: any[] = [];

      //Adjust type
      if(!Array.isArray(newRows)){
        rowsArray = [newRows];
      }else{
        rowsArray = newRows;
      }

      if(atBeginning){
        this.data.unshift(...rowsArray);
      }else{
        this.data.push(...rowsArray);
      }
    }
  }

  /*
    Updates existing row with new data;
  */
  updateRow(newRowValues: any, rowAbsoluteId: number){
    if(isNaN(rowAbsoluteId)) return;
    if(rowAbsoluteId >= 0 && rowAbsoluteId < this.data.length){
      if(isObjectValid(newRowValues)){
        this.data[rowAbsoluteId] = {...this.data[rowAbsoluteId], ...newRowValues};
      }
    }
  }

  /*
    Remove multiple rows at once
  */
  removeRows(absoluteIds: number[] | number){
    this.data = removeRequestedIndexes(this.data, absoluteIds);
  }

  /*
    Method that will be overrided in other module;
    In core its just "virtual" like method;

    By default returns null;
  */
  renderWay = (_tableArray: TableRow[]) => {
    return null;
  }

  /*
    Calls and returns value of renderWay method;
    Also passes to method values from this class;
    that allows to pass values as props when renderWay is overrieded by 
    other method;
  */
  render = () => {
    const columnsConfig = this.columnsConfig;
    const config = this.config;
    let data = this.data;

    //Handle sorting options
    if(this.config.orderBy !== undefined){
      const orderIndex = this.config.orderBy;

      //Find column by witch table will be sorted;
      const validIndex = columnsConfig.some(e => e && e.columnIndex === orderIndex)

      //if matching column has been found; sort data 
      if(validIndex){
        data = sortData(data, orderIndex);

        //sort methods by default sorts data ascending.
        //If descending option has been choosen, reverse data;
        if(this.config.descending){
          data = data.reverse();
        }
      }
    }

    //Create headers row;    
    const header : TableRow = generateHeaders(columnsConfig, config);// array with column names;
    //create tableBody rows;
    const table : TableRow[] = generateTableBody(columnsConfig, data, config);

    // Skip adding headers if table is going to be headerlesss
    if(!config.headerless){
      //headers are always the first element of the table array; 
      table.unshift(header);
    }
    
    // table.unshift(headers)
    return this.renderWay(table);
  }
}