import { ColumnConfig, TableConfig, Cell, TableRow } from '../../models/Interfaces';
import { createDataCell, createCellFromRawData } from '../CreatingCells';
import { isObjectValid } from '../utilities';

/*
  Returns array of TableRows of table data;

  Data is formated with provided functions;
  if no function formater is provided by end user saves raw data;
*/
export function generateTableBody(columnsConfig: ColumnConfig[], data: any[], config: TableConfig): TableRow[] {
  const table: TableRow[] = []; //Temp variable with 2d array of rows and columns data;
  // for Each - every table ROW

  let currentOrdinal = 1;
  data.forEach((sourceObject, index)=>{
    //Check is sourceObject valid object
    if(!isObjectValid(sourceObject)){
      return;
    }

    const row: TableRow = {
      absoluteId: index, //Absolute index is index of that element in source array;
      cells: [],
    };

    // Add ordinal number if user provided that request in config
    if(config.addOrdinalNumber){
      const ordinalNumber: number = currentOrdinal; //Ordinal number of that row
      currentOrdinal++;

      const className: string = config.ordinalColumnClassName ?? 'ordinal';

      const cell: Cell = createCellFromRawData(ordinalNumber.toString(), className);
      row.cells.push(cell);
    }

    //  for loop; calls for every column in table (in specific row)
    columnsConfig.forEach((columnConfig: ColumnConfig)=>{
      const cell: Cell = createDataCell(sourceObject, columnConfig)
      row.cells.push(cell);
    })
    table.push(row);
  })

  return table;
}