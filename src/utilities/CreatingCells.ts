import { isFunction } from './utilities.js';
import { ColumnConfig, Cell  } from '../models/Interfaces';

export const createDataCell  = (row: any, columnConfig: ColumnConfig) : Cell => {
  const {columnIndex, columnClassName, columnFormat } = columnConfig;

  let value = row[columnIndex] ?? ''; //Value of cell;
  let className = columnClassName ?? ''; //className of cell;

  //Merge values intro Cell Object;
  const cell: Cell = createCellFromRawData(value, className);

  //format value by user provided format function
  if(columnFormat && isFunction(columnFormat)){
    cell.value = columnFormat(cell.value);
  }

  return cell;
}

//Creates cell, requires only value and className as raw data;
export const createCellFromRawData = (value: string | undefined, className: string | undefined): Cell => {
  const cell: Cell = {
    value: value ?? '',
    className: className ?? '',
  }
  return cell;
}