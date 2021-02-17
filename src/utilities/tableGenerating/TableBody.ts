import { ColumnConfig, TableConfig, Cell } from './../../models/Interfaces';
import { createDataCell, createCellFromRawData } from './../CreatingCells';

/*
  Prepares data ready to be mapped to table element;
  sets 2D array of ColumnField with columns and rows of table data;

  Data is formated with provided functions;
  if no function formater is provided by end user saves raw data;
*/
export function generateTableBody(columnsConfig: ColumnConfig[], data: any[], config: TableConfig): Cell[][] {
  const table: Cell[][] = []; //Temp variable with 2d array of rows and columns data

  // for Each - every table ROW
  data.forEach((row, index)=>{
    const rowValues: Cell[] = [];

    // Add ordinal number if user provided that request in config
    if(config.addOrdinalNumber){
      const currentOrdinal: number = index + 1;
      const className: string = config.ordinalColumnClassName ?? 'ordinal';

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