import { ColumnConfig, TableConfig, Cell } from './models/Interfaces';
import { createDataCell, createCellFromRawData } from './utilities/CreatingCells.js';
import { sortData } from './utilities/Sorting.js';
import { generateTableBody } from './utilities/tableGenerating/TableBody.js';
import { generateHeaders } from './utilities/tableGenerating/TableHeaders.js';

export default class Tabless {
  columnsConfig: ColumnConfig[]; //Configs of every column that table have 
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
    const headers : Cell[] = generateHeaders(columnsConfig, config);// array with column names;
    //create tableBody rows;
    const table : Cell[][] = generateTableBody(columnsConfig, data, config);

    //headers are always the first element of the table array;
    if(!config.headerless){
      table.unshift(headers);
    }
    
    // table.unshift(headers)
    return this.renderWay(table);
  }
}