import { ColumnConfig, TableConfig, TableRow } from './models/Interfaces';
import { sortData } from './util/Sorting';
import { generateTableBody } from './util/tableGenerating/TableBody';
import { generateHeaders } from './util/tableGenerating/TableHeaders';
import { isObjectValid, removeInvalidElements, removeRequestedIndexes } from './util/utilities'

export default class Tabless {
  columnsConfig: ColumnConfig[] = []; //Configs of every column that table have 
  data: any[]; //Data displated in column

  config: TableConfig = { //Default configuration on Tabless instance;
    addOrdinalNumber: false,
    ordinalHeader: 'No.',
    ordinalColumnClassName: 'ordinal',
    orderBy: undefined,
    descending: false,
    headerless: false,
  };

  constructor(columnsConfig: ColumnConfig[], data: any[], config: TableConfig = {} ) {
    this.columnsConfig = columnsConfig;
    this.data = removeInvalidElements(data);
    
    this.setConfig(config);
  }

  /*
    Updates current configuration with new configuration provided by user
  */
  setConfig(newConfig: TableConfig) {
    this.config = {...this.config, ...newConfig};
  }

  /*
    Add new column to the table
  */
  addColumn(newColumn: ColumnConfig){
    if(newColumn && newColumn.columnName && newColumn.columnIndex){
      this.columnsConfig.push(newColumn);
    }
  }
  /*
    Remove column by its id (userProvided id)
  */
  removeColumnById(columnIdToRemove: string | number){
    if(!columnIdToRemove) return;

    this.columnsConfig = this.columnsConfig.filter(({columnId}, i)=> {
      return columnId != columnIdToRemove;
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
  addRow(newRow: any, atBeginning: boolean = false){
    if(isObjectValid(newRow)){
      if(atBeginning){
        this.data.unshift(newRow);
      }else{
        this.data.push(newRow);
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
      const validIndex = columnsConfig.some(e => e.columnIndex === orderIndex)

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