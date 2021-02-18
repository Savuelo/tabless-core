import { ColumnConfig, TableConfig, Cell, TableRow } from '../../models/Interfaces';
import { createCellFromRawData } from '../CreatingCells';

/*
  Returns TableRow Object with headers Cells
*/
export function generateHeaders(columnsConfig: ColumnConfig[], config: TableConfig) : TableRow {
  const header: TableRow = {
    absoluteId: -1, //Header absolute id is -1 becouse it's not part of data part of the table
    cells: []
  };

  // If ordinary cell is request add header
  if(config.addOrdinalNumber){
    const value =  config.ordinalHeader ?? 'No.';
    const className = config.ordinalColumnClassName ?? 'ordinal';

    const ordinaryHeaderCell: Cell = createCellFromRawData(value, className);
    header.cells.push(ordinaryHeaderCell);
  }

  //create header cell
  columnsConfig.forEach((e)=>{
    if(!e) return; 
    
    const {columnName, columnClassName} = e;
    const headerCell: Cell = createCellFromRawData(columnName, columnClassName);
    header.cells.push(headerCell);
  }) 
  return header;
}