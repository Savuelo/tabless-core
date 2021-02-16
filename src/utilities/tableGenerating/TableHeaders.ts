import { ColumnConfig, TableConfig, Cell } from './../../models/Interfaces';
import { createCellFromRawData } from './../CreatingCells.js';

/*
  returns an array of cells of header row;
*/
export function generateHeaders(columnsConfig: ColumnConfig[], config: TableConfig) : Cell[] {
  const headers: Cell[] = [];

  // If ordinary cell is request add header
  if(config.addOrdinalNumber){
    const value =  config.ordinalHeader ?? 'No.';
    const className = config.ordinalColumnClassName ?? 'ordinal';

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